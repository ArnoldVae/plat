<template>
    <div class="main-check">
        主监考
        <sys></sys>
    </div>
</template>
<script>
    import  sys from "../../views"
    export default {
        name: 'mainCheck',
        components: {
            sys

        },
        props: {},

        data() {
            return {
                defaultMapConfig: {
                    center: {lng: 118.79288, lat: 31.88029},
                    zoom: 10,
                    scrollWheelZoom: true,
                    minZoom: 8,
                    maxZoom: 15
                },
                // 地图相关数据
                rcu35: require('@/assets/img/common/rcu-35kV.png'),
                rcu110: require('@/assets/img/common/rcu-110kV.png'),
                rcu220: require('@/assets/img/common/rcu-220kV.png'),
                rcu500: require('@/assets/img/common/rcu-500kV.png'),
                paraData: [
                    {
                        id: 'test0',
                        title: '站点',
                        describe: '站点统计',
                        color1: 'color-yellow',
                        detail: [
                            {value: 68, name: '在线', class: 'color-yellow shape-icon'},
                            {value: 2, name: '离线', class: 'color-blue shape-icon'}
                        ],
                        color: ['#37a8f2', '#ffdf6f'] //手动设置每个图例的颜色
                    },
                    {
                        id: 'test1',
                        title: '警情',
                        describe: '警情统计',
                        detail: [
                            {value: 78, name: '预警', class: 'color-blue shape-icon'},
                            {value: 22, name: '报警', class: 'color-red shape-icon'}
                        ],
                        color: ['#37a8f2', '#cf1322'] //手动设置每个图例的颜色
                    },
                    {
                        id: 'test2',
                        title: '设备',
                        describe: '设备统计',
                        detail: [
                            {value: 58, name: '正常', class: 'color-blue shape-icon'},
                            {value: 49, name: '故障', class: 'color-dark-yellow shape-icon'}
                        ],
                        color: ['#37a8f2', '#e69110'] //手动设置每个图例的颜色
                    },
                    {
                        id: 'test4',
                        title: '缺陷',
                        describe: '缺陷统计',
                        detail: [
                            {value: 68, name: '一类', class: 'color-red shape-icon'},
                            {value: 30, name: '二类', class: 'color-dark-yellow shape-icon'},
                            {value: 90, name: '三类', class: 'color-yellow shape-icon'}
                        ],
                        color: ['#cf1322', '#e69110', '#ffdf6f'] //手动设置每个图例的颜色
                    }
                ],
                options1: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    },
                    {
                        value: '选项2',
                        label: '双皮奶'
                    }
                ],
                sysLists: [
                    {
                        name1: '500kv东善桥变电站',
                        name2: '26#烟感探测器报警',
                        name3: '1号主变防护区',
                        name4: '2019-07-30 14:20:30',
                        name5: 'alarm-action'
                    },
                    {
                        name1: '500kv东善桥变电站',
                        name2: '26#烟感探测器报警',
                        name3: '1号主变防护区',
                        name4: '2019-07-30 14:20:30',
                        name5: 'alarm-action'
                    },
                    {
                        name1: '500kv东善桥变电站',
                        name2: '26#烟感探测器报警',
                        name3: '1号主变防护区',
                        name4: '2019-07-30 14:20:30',
                        name5: 'alarm-action'
                    },
                    {
                        name1: '500kv东善桥变电站',
                        name2: '26#烟感探测器报警',
                        name3: '1号主变防护区',
                        name4: '2019-07-30 14:20:30',
                        name5: 'alarm-action'
                    }
                ],
                orgOptions: [],
                fireList: [],
                value: '',
                levelArr: [],
                rcuName: '',
                tableData: [],
                noRcuSow: false,
                res: {},
                javainterface: {
                    allStation: {
                        subModuleName: 'systemView',
                        interfaceName: 'getAllStation',
                        param: {iType: 10060003}
                    }
                },
                eleCount: [] //获取消防模块接口下面的所有变电站
            }
        },
        computed: {},
        filters: {},
        watch: {},
        created() {
        },
        mounted() {

        },
        activited() {
        },
        update() {
        },
        beforeDestory() {
        },
        methods: {

        },
        beforeRouteEnter(to, from, next) {
            next()
        },
        beforeRouteUpdate(to, from, next) {
            next()
        },
        beforeRouteLeave(to, from, next) {
            next()
        },

    }
</script>

<style lang="stylus" scoped>


</style>
