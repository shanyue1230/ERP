<template>
  <el-dialog
    class="employeeDialog"
    width="1250px"
    title="根据部门选择用户"
    :visible.sync="visible"
    append-to-body
  >
    <el-row :gutter="10" style="background-color: #ececec; padding: 10px; margin: -10px">
      <el-col :md="6" :sm="24">
        <el-card>
          <!-- 组织架构树 -->
          <el-tree
            style="margin-top: 20px;"
            :data="departTree"
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            @current-change="handleNodeChange"
          ></el-tree>
        </el-card>
      </el-col>
      <el-col :md="18" :sm="24">
        <el-card>
          <!-- 搜索 -->
          <el-input placeholder="请输入内容" v-model="filterText">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-table
            style="margin-top: 20px;"
            ref="multipleTable"
            :data="userList"
            @selection-change="handleUserSelectionChange"
            :header-cell-style="{background:'rgba(229, 233, 242, 1)',color:'#000',fontWeight:'400'}"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="userNo" label="工号" width="150"></el-table-column>
            <el-table-column prop="name" label="姓名" width="150"></el-table-column>
            <el-table-column prop="sex" label="性别" width="150"></el-table-column>
            <el-table-column prop="departName" label="部门" width="150"></el-table-column>
            <el-table-column prop="position" label="岗位" width="150"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button @click="innerVisible = false">取 消</el-button>
      <el-button type="primary" @click="innerVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'JSelectUserByDepModal',
  components: {},
  props: ['modalWidth'],
  data () {
    return {
      visible: false,
      queryParam: {
        username: ''
      },
      departTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      userList: [],
      selectedUserList: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
      filterText: ''
    };
  },
  computed: {
    // pageSize () {
    //   return (
    //     this.total / this.pageSize + (this.total % this.pageSize > 0 ? 1 : 0)
    //   );
    // }
  },
  created () {},
  methods: {
    /**
     *  打开弹框
     */
    showModal () {
      this.visible = true;
      this._queryDepartTree();
    },
    /**
     * 关闭弹框
     */
    close () {
      this.visible = false;
    },
    /**
     * 选择树节点,筛选出对应的用户
     */
    handleNodeChange (selectedData, selectedNode) {
      if (selectedNode) this.currentPage = 1;
      if (selectedData.type === 1) {
        // 公司
        this._queryUsers(selectedData.id, null);
      } else {
        // 部门
        this._queryUsers(null, selectedData.id);
      }
    },
    /**
     * 页面跳转
     */
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage;
      this.handleNodeChange(this.$refs.tree.getCurrentNode());
    },
    /**
     * 改变分页长度
     */
    handleSizeChange (size) {
      this.currentPage = 1;
      this.pageSize = size;
      this.handleNodeChange(this.$refs.tree.getCurrentNode());
    },
    /**
     * 选择人员
     */
    handleUserSelectionChange (selection) {
      console.log(selection);
    },
    /**
     * 获取部门树
     */
    _queryDepartTree () {
      // （实际从接口获取数据）
      this.departTree = [
        {
          id: 1,
          label: '西弗瑞',
          type: 1,
          children: [
            {
              id: 11,
              label: '技术部',
              type: 2,
              children: []
            },
            {
              id: 12,
              label: '测试部',
              type: 2,
              children: []
            }
          ]
        },
        {
          id: 2,
          label: '鸿腾',
          type: 1,
          children: [
            {
              id: 13,
              label: '行政部',
              type: 2,
              children: []
            },
            {
              id: 14,
              label: '生产部',
              type: 2,
              children: []
            }
          ]
        }
      ];
    },
    /**
     * 删选用户
     */
    _queryUsers (companyId, departId) {
      const users = [
        {
          id: 111,
          companyId: 1,
          departId: 11,
          departName: '开发部',
          userNo: 'xfr001',
          name: '小万',
          sex: '男',
          position: '开发'
        },
        {
          id: 112,
          companyId: 1,
          departId: 11,
          departName: '开发部',
          userNo: 'xfr002',
          name: '小祝',
          sex: '男',
          position: '开发'
        },
        {
          id: 113,
          companyId: 1,
          departId: 11,
          departName: '开发部',
          userNo: 'xfr003',
          name: '小曹',
          sex: '男',
          position: '开发'
        },
        {
          id: 114,
          companyId: 1,
          departId: 11,
          departName: '开发部',
          userNo: 'xfr004',
          name: '小杨',
          sex: '女',
          position: '开发'
        },
        {
          id: 115,
          companyId: 1,
          departId: 11,
          departName: '开发部',
          userNo: 'xfr005',
          name: '小宋',
          sex: '男',
          position: '开发'
        },
        {
          id: 116,
          companyId: 1,
          departId: 11,
          departName: '开发部',
          userNo: 'xfr006',
          name: '小文',
          sex: '女',
          position: '开发'
        },
        {
          id: 117,
          companyId: 1,
          departId: 11,
          departName: '开发部',
          userNo: 'xfr007',
          name: '小祝',
          sex: '谭',
          position: '开发'
        },
        {
          id: 118,
          companyId: 1,
          departId: 11,
          departName: '开发部',
          userNo: 'xfr008',
          name: '小燕',
          sex: '男',
          position: '开发'
        },
        {
          id: 119,
          companyId: 1,
          departId: 11,
          departName: '开发部',
          userNo: 'xfr009',
          name: '小吴',
          sex: '男',
          position: '开发'
        },
        {
          id: 120,
          companyId: 1,
          departId: 11,
          departName: '开发部',
          userNo: 'xfr010',
          name: '小刘',
          sex: '女',
          position: '开发'
        },
        {
          id: 121,
          companyId: 1,
          departId: 11,
          departName: '开发部',
          userNo: 'xfr011',
          name: '小汗',
          sex: '男',
          position: '开发'
        },
        {
          id: 122,
          companyId: 1,
          departId: 12,
          departName: '产品部',
          userNo: 'xfr022',
          name: '小蒋',
          sex: '男',
          position: '产品'
        },
        {
          id: 123,
          companyId: 1,
          departId: 12,
          departName: '产品部',
          userNo: 'xfr013',
          name: '小高',
          sex: '男',
          position: '测试'
        },
        {
          id: 124,
          companyId: 1,
          departId: 12,
          departName: '产品部',
          userNo: 'xfr014',
          name: '小倪',
          sex: '女',
          position: '测试'
        },
        {
          id: 125,
          companyId: 2,
          departId: 13,
          departName: '行政部',
          userNo: 'ht001',
          name: '小李',
          sex: '女',
          position: '行政'
        },
        {
          id: 126,
          companyId: 2,
          departId: 14,
          departName: '生产部',
          userNo: 'ht002',
          name: '小赵',
          sex: '男',
          position: '班组长'
        }
      ];
      let filterUsers = Array.from(users);
      if (companyId) {
        filterUsers = users.filter(u => u.companyId === companyId);
      }
      if (departId) {
        filterUsers = users.filter(u => u.departId === departId);
      }
      this.total = filterUsers.length;
      this.userList = filterUsers.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  }
};
</script>
<style lang="less"  src="./index.less" scoped>
</style>
