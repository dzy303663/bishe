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
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="type"
        label="文件格式">
      </el-table-column>
      <el-table-column
        prop="size"
        label="文件大小">
      </el-table-column>
      
      <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(tableData[scope.$index])"
          type="text"
          size="small">
          下载
        </el-button>
      </template>
    </el-table-column>
    </el-table>
  </template>

  <script>
import { formatDate } from "../../common/js/utils";
export default {
  data() {
    return {
      tableData: [
        {
          date: formatDate(new Date(), "yyyy-MM-dd hh:mm"),
          course: "高数",
          type: "ppt",
          size: "30M",
          name: "线性代数ppt",
          url: "http://localhost:5200/download"
        },
        {
          date: formatDate(new Date(), "yyyy-MM-dd hh:mm"),
          course: "语文",
          type: "ppt",
          size: "30M",
          name: "线性代数ppt",
           url: "http://localhost:5200/download"
        },
        {
          date: formatDate(new Date(), "yyyy-MM-dd hh:mm"),
          course: "数学",
          type: "ppt",
          size: "30M",
          name: "线性代数ppt",
           url: "http://localhost:5200/download"
        },
        {
          date: formatDate(new Date(), "yyyy-MM-dd hh:mm"),
          course: "英语",
          type: "ppt",
          size: "30M",
          name: "线性代数ppt",
          url: "http://localhost:5200/download"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    deleteRow(row) {
      console.log(row);
      this.$http({
        method: "post",
        url: row.url,
        data: {filename: "gaoshu.ppt"},
        responseType: "blob",
      })
        .then(res => {
          console.log(res)
         /*  var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
              var downloadElement = document.createElement('a');
              var href = window.URL.createObjectURL(blob); //创建下载的链接
              downloadElement.href = href;
              downloadElement.download = orderId+'.docx'; //下载后文件名
              document.body.appendChild(downloadElement);
              downloadElement.click(); //点击下载
              document.body.removeChild(downloadElement); //下载完成移除元素
              window.URL.revokeObjectURL(href); //释放掉blob对象 */
               this.download(res)
        })
        .catch(error => {});
    },
    download(data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data.data],{type:'application/vnd.ms-powerpoint'}));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "gaoshu.ppt");

      document.body.appendChild(link);
      link.click();
    }
  }
};
</script>