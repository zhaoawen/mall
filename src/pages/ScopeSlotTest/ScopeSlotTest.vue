<template>
  <div>
      <h2>效果一：显示todo列表时，已完成的todo为绿色</h2>
      <!-- 子组件的数据是父组件给的 -->
      <List :todos="todos">
      <!-- 子组件决定不了结构与外观 -->
      <template slot-scope="todo">
          <span :style="{color:todo.todo.isComplete?'green':'red'}">{{todo.todo.text}}</span>
      </template>
      </List>
      <h2>效果二：显示todo列表时，带序号，todo的颜色为蓝绿搭配</h2>
      <List1 :todos="todos">
        <template slot-scope="{todo,$index}">
            <span :style="{color:todo.isComplete?'red':'purple'}">{{$index}}-----{{todo.text}}</span>
        </template>

      </List1>
  </div>
</template>

<script>
import List from './List.vue';
import List1 from './List1.vue';
export default {
    name:'ScopeSlotTest',
    data() {
        return {
            todos:[
                {id:1,text:'AAA',isComplete:false},
                {id:2,text:'BBB',isComplete:true},
                {id:3,text:'CCC',isComplete:false},
                {id:4,text:'DDD',isComplete:false},

            ]
        }
    },
    components:{
        List,
        List1,
    }

}
</script>

<style>

</style>