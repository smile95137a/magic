<template>
  <div class="calendar-card">
    <!-- 上：紅底 header -->
    <div class="calendar-card__header">
      <!-- 日期：貼齊 header 底部一半 -->
      <div class="calendar-card__date">
        <div class="calendar-card__month">{{ month }}</div>
        <div class="calendar-card__day">{{ day }}</div>
        <div class="calendar-card__weekday">{{ weekday }}</div>
      </div>

      <!-- 農曆與生肖 -->
      <div class="calendar-card__right">
        <div class="calendar-card__lunar">
          <div class="calendar-card__lunar-year">{{ lunarYear }}</div>
          <div class="calendar-card__lunar-date">{{ lunarDate }}</div>
        </div>
        <div class="calendar-card__zodiac-circle">{{ zodiac }}</div>
      </div>
    </div>

    <!-- 下：白底宜忌 -->
    <div class="calendar-card__body">
      <!-- 固定右上角的連結 -->
      <a href="#" class="calendar-card__link">
        查看其他日期 <i class="fas fa-arrow-right"></i>
      </a>

      <div
        v-for="(item, index) in info"
        :key="index"
        class="calendar-card__info-item"
      >
        <span class="calendar-card__info-tag" :class="item.color">
          {{ item.type }}
        </span>
        <span class="calendar-card__info-text">{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CalendarInfo {
  type: string;
  text: string;
  color: 'green' | 'purple' | 'gray';
}

interface CalendarData {
  month: string;
  day: string;
  weekday: string;
  lunarYear: string;
  lunarDate: string;
  zodiac: string;
  info: CalendarInfo[];
}

const props = defineProps<{
  calendarData: CalendarData;
}>();

const { month, day, weekday, lunarYear, lunarDate, zodiac, info } =
  props.calendarData;
</script>

<style scoped lang="scss">
.calendar-card {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Noto Sans TC', sans-serif;
  position: relative;

  &__header {
    background: #a53b25;
    color: #fff;
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    position: relative;
    height: 80px;
  }

  &__date {
    position: absolute;
    left: 1.5rem;
    bottom: -50px;
    width: 108px;
    height: 108px;
    background: #e0664d;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;

    .calendar-card__month {
      font-size: 0.85rem;
      margin-bottom: 0.1rem;
    }

    .calendar-card__day {
      font-size: 2rem;
      font-weight: bold;
      line-height: 1;
    }

    .calendar-card__weekday {
      font-size: 0.85rem;
      margin-top: 0.1rem;
    }
  }

  &__right {
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    color: #eeafa2;
    gap: 0.75rem;
  }

  &__lunar {
    line-height: 1.4;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__lunar-year,
  &__lunar-date {
    line-height: 1.2;
  }

  &__lunar-year {
    margin-bottom: 0.15rem;
  }

  &__zodiac-circle {
    background: transparent;
    border: 1.5px solid #eeafa2;
    font-size: 24px;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__body {
    position: relative;
    padding: 3.5rem 1.5rem 1.5rem;
    background: #fff;
    border-top: 1px solid #eee;
    font-size: 0.9rem;
    color: #333;
  }

  &__info-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.6rem;
  }

  &__info-tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: bold;
    color: #fff;
    border-radius: 999px;
    padding: 0.25rem 0.65rem;
    margin-right: 0.6rem;

    &.green {
      background: #72c26d;
    }

    &.purple {
      background: #b06ed2;
    }

    &.gray {
      background: #999;
    }
  }

  &__info-text {
    flex: 1;
    line-height: 1.6;
  }

  &__link {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 0.85rem;
    color: #c2aeaa;

    i {
      margin-left: 0.3rem;
    }
  }
}
</style>
