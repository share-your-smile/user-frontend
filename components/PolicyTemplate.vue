<template>
  <div class="article">
    <div v-if="article.title" class="text-h5">{{ article.title }}</div>
    <div style="width:100%;height:20px;"/>
    <div v-if="article.main" class="text-subtitle-1">{{ article.main }}</div>
    <div v-if="article.list">
      <div v-for="(item, index) in article.list" :key="index">
        <div v-if="item.item" class="text-body-1 lists">
          {{index + 1}}. {{ item.item }}
        </div>
        <div v-if="item.list">
          <div v-for="(subItem, subIndex) in item.list" :key="subIndex">
            <div v-if="subItem.item" class="text-body-2 subLists">
              {{subIndex + 1}}. {{ subItem.item }}
            </div>

            <div v-if="subItem.list">
              <div v-for="(subSubItem, subSubIndex) in subItem.list" :key="subSubIndex">
                <div v-if="subSubItem.item" class="text-body-2 subSubLists">
                  {{subSubIndex + 1}}. {{ subSubItem.item }}
                </div>
                
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div style="width:100%;height:20px;"/>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component({})
export default class PolicyTemplate extends Vue {
  @Prop({ default: [] })
  article!: any
}
</script>

<style scoped>
.article {
  font-family: -apple-system, "Segoe UI", "Helvetica Neue", "Hiragino Kaku Gothic ProN", メイリオ, meiryo, sans-serif;
}
.lists {
  margin-left: 20px;
}
.subLists {
  margin-left: 40px;
}
.subSubLists {
  margin-left: 60px;
}
</style>