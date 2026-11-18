# 粵語口語練習（香港粵語）

給台灣人（國語母語）從零開始學**香港口語粵語**的網頁 App。

**手機使用：** 用瀏覽器打開 GitHub Pages 網址，選「加到主畫面」，就能像 App 一樣使用，也支援離線複習。

## 功能

- **課程**：10 課生活情境（打招呼、茶餐廳、問路、搭港鐵、逛街、酒店、交朋友、約時間、聊近況、聽不懂時怎麼辦），附繁體字、粵拼（LSHK Jyutping）和台灣國語翻譯
- **聲調**：六聲示範＋國語母語者容易混淆的聲調對比聽辨
- **聽力測驗**、**跟讀**（語音辨識打分）、**字卡複習**（答錯的卡更常出現）

## 檔案

- `index.html`：App 本體
- `lessons.js`：課程資料（新增課程照同樣格式加進 `LESSONS`）
- `manifest.webmanifest`、`sw.js`、`icons/`：手機安裝與離線功能
- `tools/`：呼叫 Codex 的輔助腳本

## 製作方式

課程由 Claude、Codex、ChatGPT、Meta Muse 交叉撰寫與審稿，以香港日常口語為準，並參考 [粵典 words.hk](https://words.hk/)。

## 發音提示

播放使用瀏覽器內建的粵語（zh-HK）語音。iPhone 和 Android 通常內建；Windows 電腦建議用 Edge 開啟。
