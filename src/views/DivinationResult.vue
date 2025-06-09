<template>
  <div class="divination-result">
    <div class="divination-result__layout">
      <!-- 左側紅色卡片 -->
      <div class="divination-result__card">
        <h2 class="divination-result__title">求籤問事</h2>

        <h3 class="divination-result__poem-title">
          第七十一籤（古人）文君訪相如
        </h3>
        <p class="divination-result__label">【吉凶】中籤</p>
        <p class="divination-result__label">【詩曰】</p>
        <p class="divination-result__paragraph">
          誰知倉龍十九衝 女子當年嫁二夫<br />
          自是一弓架兩箭 欲恐龍馬上安居
        </p>

        <p class="divination-result__label">【解曰】</p>
        <p class="divination-result__paragraph">
          不出重重 事由天命 振放中間 切宜謹守
        </p>

        <p class="divination-result__label">【先機】</p>
        <p class="divination-result__paragraph">
          此卦一弓架兩箭之象，凡事再合則吉也。此籤家宅損失，自身是非，求財勞力，<br />
          交易謹防，婚姻再合，行人阻，六甲先虛後實，田蠶晚收，六畜損，尋人見，訟宜，<br />
          病懸旱，移徒吉，山墳改。
        </p>

        <p class="divination-result__label">古人典故《文君訪相如》</p>
        <p class="divination-result__paragraph">
          古代戀愛故事，漢朝時，卓文君之夫死後，在家守寡，讀詩書遣日子，一日邂逅了很有學問的司馬相如，
          卓文君深夜造訪相如，傾訴心中真情，二人遂私奔出城，回到成都結為夫婦。
          後來司馬相如被漢武帝賞識，在朝庭當官。倉龍、青龍、九衝：繁華的街市。
        </p>
      </div>

      <!-- 右側籤卡獨立 -->
      <div class="divination-result__poem-image"></div>
    </div>

    <!-- 底部祈福按鈕 -->
    <div class="divination-result__footer">
      <button class="divination-result__blessing-button">
        消災解厄，點燈祈福
        <span class="divination-result__blessing-icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 無邏輯，靜態展示頁
</script>
<style lang="scss" scoped>
.divination-result {
  padding: 3rem 2rem;
  background: linear-gradient(to bottom, #e4bfb5, #d9a6a0);

  &__layout {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
  }

  &__card {
    flex: 1 1 60%;
    background: linear-gradient(41.51deg, #e0664d 24.05%, #a53b25 60.53%);
    border-radius: 20px;
    padding: 2rem;
    color: white;
    font-family: 'Noto Serif TC', serif;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  &__poem-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  &__label {
    font-weight: bold;
    margin-top: 1.2rem;
    margin-bottom: 0.3rem;
  }

  &__paragraph {
    font-size: 1rem;
    line-height: 1.8;
  }

  &__poem-image {
    flex: 1 1 35%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem;

    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }

  &__footer {
    text-align: center;
    margin-top: 2rem;
  }

  &__blessing-button {
    background: none;
    border: none;
    color: #a52f2f;
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 1rem 2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border-top: 1px solid #a52f2f;
    border-bottom: 1px solid #a52f2f;
    font-family: 'Noto Sans TC', sans-serif;
  }

  &__blessing-icon {
    background-image: url('@/assets/image/cloud-icon.png');
    background-size: contain;
    background-repeat: no-repeat;
    width: 28px;
    height: 24px;
  }
}
</style>
