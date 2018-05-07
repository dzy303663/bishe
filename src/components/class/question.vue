  <template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="course"
        label="课程"
        width="180">
      </el-table-column>
      <el-table-column
        prop="question"
        label="问题">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData4)"
          type="text"
          size="small">
          查看
        </el-button>
      </template>
    </el-table-column>
    </el-table>
  </template>

  <script>
  import {formatDate} from '../../common/js/utils'
    export default {
      data() {
        return {
          tableData: [{
            date: formatDate(new Date(),"yyyy-MM-dd hh:mm"),
            course: '高数',
            question: '作业太多了 '
          }, {
            date: formatDate(new Date(),"yyyy-MM-dd hh:mm"),
            course: '语文',
            question: '作业太多了 '
          }, {
            date: formatDate(new Date(),"yyyy-MM-dd hh:mm"),
            course: '数学',
            question: '作业太多了'
          }, {
            date: formatDate(new Date(),"yyyy-MM-dd hh:mm"),
            course: '英语',
            question: '作业太多了 '
          }]
        }
      }
    }
  </script>