<template>
  <div>
    <h1>테이블 페이징을 해보아요</h1>
    <!-- 자식 컴포넌트인 paginated-list의 list-array에 부모 컴포넌트의 pageArray 값을 저장 -->
    <paginated-list :list-array="pageArray"/>
  </div>
</template>

<script>
import axios from 'axios'
import PaginatedList from './PaginatedList'

export default {
  name: 'simple-pagination',
  components: {PaginatedList},
  data () {
    return {
     pageArray: []
    }
  },
  created() {
    axios.get('http://sample.bmaster.kro.kr/contacts')
    .then(response => {
      console.log(response);
      this.pageArray = response.data.contacts;
    })
    .catch(err => {
      console.log(err);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1 {
  color: #454545;
  text-align: center;
}
</style>
