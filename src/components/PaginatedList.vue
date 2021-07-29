<template>
  <div>
    <table>
      <tr>
        <th>NO</th>
        <th>TEL</th>
        <th>ADDRESS</th>
        <th>NAME</th>
      </tr>
      <!-- 아래 computed의 paginatedData function 소환해서 그 결과값을 뿌려줌 -->
      <tr v-for="p in paginatedData" :key="p.no">
        <td>{{ p.no }}</td>
        <td>{{ p.tel }}</td>
        <td>{{ p.address }}</td>
        <td>{{ p.name }}</td>
      </tr>
    </table>
    <div class="btn-cover">
      <!-- 버튼을 누를 때마다 pageNum이 변경되고 이는 computed에서 감지하고 리스트를 다시 불러오게 됨 -->
      <button :disabled="pageNum===0" @click="prevPage" class="page-btn">이전</button>
      <!-- 총 페이지의 개수를 계산해 주는 PageCount function 실행 -->
      <!-- 이전 3/12(총 페이지)페이지 다음 과 같은 화면이 뜰 것-->
      <span class="page-count">{{pageNum + 1}}/{{pageCount}} 페이지</span>
      <button :disabled="pageNum>=pageCount-1" @click="nextPage" class="page-btn">다음</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageinated-list',
  data() {
    return {
      pageNum: 0
    }
  },
  props:{
    listArray: {
      type: Array,
      required: true
    },
    pageSize: {
      type: Number,
      required: false,
      default: 10
    }
  },
  methods: {
    nextPage() {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    }
  },
  computed: {
    pageCount() { // 총 페이지를 계산하는 함수
      let listLeng = this.listArray.length, // 부모 컴포넌트가 보냈던 list의 길이를 잼
      listSize = this.pageSize, // 부모 컴포넌트가 따로 보낸 게 없으면 디폴트인 10으로 저장됨
      page = Math.floor(listLeng/listSize); // 페이지 수 계산

      if(listLeng % listSize > 0) page += 1;

      return page;
    },
    paginatedData() { // 자신이 설정한 페이지 크기에 맞춰 데이터들을 반환시켜줌
      const start = this.pageNum * this.pageSize, // 페이지 순번 * 총 페이지에 보일 사이즈 = 시작 인덱스
      end = start + this.pageSize; // 시작 인덱스 + 총 페이지에 보일 사이즈 = 끝 인덱스

      return this.listArray.slice(start, end);  // 총 리스트를 페이징에 맞게 잘라서 반환
    }
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
table th {
  font-size: 1.2rem;
}
table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}
table tr:first-of-type {
  border-top: 2px solid #404040;
}
table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}
.btn-cover .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}
.btn-cover .page-count {
  padding: 0 1rem;
}
</style>
