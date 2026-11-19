"""產生所有句子的粵語神經網路語音檔，並輸出 audio-map.js

用法：python tools/gen-audio.py
需要：pip install edge-tts，以及 node（用來讀取課程資料）
已經產生過的音檔會略過，所以新增內容後重跑只會補新的句子。
"""
import asyncio, hashlib, json, os, re, subprocess, sys

import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(ROOT, 'audio')
os.makedirs(AUDIO, exist_ok=True)

items = json.loads(subprocess.check_output(['node', os.path.join(ROOT, 'tools', 'list-texts.js')], encoding='utf-8'))


def clip_name(text, voice):
    return hashlib.sha1(f'{voice}|{text}'.encode('utf-8')).hexdigest()[:12] + '.mp3'


def speakable(text):
    # 破折號、引號等符號不用唸
    return re.sub(r'[—「」『』…]+', '，', text).strip('，')


async def make(item, sem, stats):
    name = clip_name(item['text'], item['voice'])
    path = os.path.join(AUDIO, name)
    item['file'] = name
    if os.path.exists(path) and os.path.getsize(path) > 0:
        stats['skip'] += 1
        return
    async with sem:
        for attempt in range(3):
            try:
                voice, _, pitch = item['voice'].partition('|')
                await edge_tts.Communicate(speakable(item['text']), voice, pitch=pitch or '+0Hz').save(path)
                stats['new'] += 1
                return
            except Exception as e:  # 網路偶爾失敗就重試
                if attempt == 2:
                    stats['fail'].append((item['text'], str(e)[:80]))
                await asyncio.sleep(2)


async def main():
    sem = asyncio.Semaphore(4)
    stats = {'new': 0, 'skip': 0, 'fail': []}
    await asyncio.gather(*(make(i, sem, stats) for i in items))
    mapping = {i['text']: i['file'] for i in items if os.path.exists(os.path.join(AUDIO, i['file']))}
    with open(os.path.join(ROOT, 'audio-map.js'), 'w', encoding='utf-8') as f:
        f.write('// 句子 → 音檔對照表（由 tools/gen-audio.py 產生，請勿手動修改）\n')
        f.write('window.AUDIO_MAP = ' + json.dumps(mapping, ensure_ascii=False, indent=0) + ';\n')
    # 刪掉已經沒有用到的舊音檔
    used = set(mapping.values())
    removed = 0
    for fn in os.listdir(AUDIO):
        if fn.endswith('.mp3') and fn not in used:
            os.remove(os.path.join(AUDIO, fn)); removed += 1
    size = sum(os.path.getsize(os.path.join(AUDIO, fn)) for fn in used) / 1e6
    print(f"句子 {len(items)}：新產生 {stats['new']}、沿用 {stats['skip']}、失敗 {len(stats['fail'])}、清除舊檔 {removed}，共 {size:.1f} MB")
    for t, e in stats['fail']:
        print('  失敗：', t, e)
    if stats['fail']:
        sys.exit(1)

asyncio.run(main())
