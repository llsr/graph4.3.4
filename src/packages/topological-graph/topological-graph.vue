<template>
    <div>
        <!-- <select @change="selectChange">
            <option value="default">Default mode</option>
            <option value="addEdge">连线</option>
        </select> -->
        <div id="container" :value="value" :comboType="comboType" class="container"></div>
    </div>
</template>
<script>
import G6 from '@antv/g6';
import * as Util from '@antv/util'
export default {
    name: "topological-graph",
    props: {
        value: {
            type: Object,
            default: null
        },
        comboType: {
            type: String,
            default: 'circle'
        }
    },
    data() {
        return {
            gridPlugin: null,
            graph: null,
            // colors: [
            //     '#BDD2FD',
            //     '#BDEFDB',
            //     '#C2C8D5',
            //     '#FBE5A2',
            //     '#F6C3B7',
            //     '#B6E3F5',
            //     '#D3C6EA',
            //     '#FFD8B8',
            //     '#AAD8D8',
            //     '#FFD6E7',
            // ],
            // strokes: [
            //     '#5B8FF9',
            //     '#5AD8A6',
            //     '#5D7092',
            //     '#F6BD16',
            //     '#E8684A',
            //     '#6DC8EC',
            //     '#9270CA',
            //     '#FF9D4D',
            //     '#269A99',
            //     '#FF99C3',
            // ]
        }
    },
    computed: {

    },
    mounted() {
        // this.grid();
        this.initGraph();
    },
    methods: {
        registerLine(value) {
            // 封装点击添加边的交互
            G6.registerBehavior('click-add-edge', {
                // 设定该自定义行为需要监听的事件及其响应函数
                getEvents() {
                    return {
                        'node:click': 'onClick', // 监听事件 node:click，响应函数是 onClick
                        'mousemove': 'onMousemove', // 监听事件 mousemove，响应函数是 onMousemove
                        'edge:click': 'onEdgeClick', // 监听事件 edge:click，响应函数是 onEdgeClick
                    };
                },
                // getEvents 中定义的 'node:click' 的响应函数
                onClick(ev) {
                    const _t = this;
                    const node = ev.item;
                    const graph = _t.graph;
                    // 鼠标当前点击的节点的位置
                    const point = {
                        x: ev.x,
                        y: ev.y
                    };
                    const model = node.getModel();
                    if (this.addingEdge && this.edge) {
                        graph.updateItem(this.edge, {
                            target: model.id,
                        });

                        this.edge = null;
                        this.addingEdge = false;
                    } else {
                        // 在图上新增一条边，结束点是鼠标当前点击的节点的位置
                        switch (value) {
                            case 'addEdge':
                                this.edge = graph.addItem('edge', {
                                    source: model.id,
                                    target: point,
                                });
                                break;
                            case 'addCurveEdge':
                                this.edge = graph.addItem('edge', {
                                    source: model.id,
                                    target: point,
                                    type: 'arc',
                                    curveOffset: 40,
                                });
                                break;
                        }
                        this.addingEdge = true;
                    }
                },
                // getEvents 中定义的 mousemove 的响应函数
                onMousemove(ev) {
                    const _t = this;
                    // 鼠标的当前位置
                    const point = {
                        x: ev.x,
                        y: ev.y
                    };
                    if (_t.addingEdge && _t.edge) {
                        // 更新边的结束点位置为当前鼠标位置
                        _t.graph.updateItem(_t.edge, {
                            target: point,
                        });
                    }
                },
                // getEvents 中定义的 'edge:click' 的响应函数
                onEdgeClick(ev) {
                    const _t = this;
                    const currentEdge = ev.item;
                    // 拖拽过程中，点击会点击到新增的边上
                    if (_t.addingEdge && _t.edge == currentEdge) {
                        _t.graph.removeItem(_t.edge);
                        _t.edge = null;
                        _t.addingEdge = false;
                    }
                },
            });
        },
        // grid() {
        //     const _t = this;
        //     // 实例化 grid 插件
        //     _t.gridPlugin = new G6.Grid();
        //     const nodes = this.value.nodes;
        //     const clusterMap = new Map();
        //     let clusterId = 0;
        //     nodes.forEach(function (node) {
        //         // cluster
        //         if (node.cluster && clusterMap.get(node.cluster) === undefined) {
        //             clusterMap.set(node.cluster, clusterId);
        //             clusterId++;
        //         }
        //         const cid = clusterMap.get(node.cluster);
        //         if (!node.style) {
        //             node.style = {};
        //         }
        //         node.style.fill = _t.colors[cid % _t.colors.length];
        //         node.style.stroke = _t.strokes[cid % _t.strokes.length];
        //     });
        // },
        initGraph() {
            const graphDiv = document.getElementById('container');
            const width = graphDiv.scrollWidth;
            const height = graphDiv.scrollHeight;
            this.graph = new G6.Graph({
                container: 'container',
                width,
                height,
                fitView: true,
                fitViewPadding: 20,
                // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理
                groupByTypes: false,
                modes: {
                    default: ['drag-canvas', 'zoom-canvas', 'drag-combo', 'collapse-expand-combo', 'drag-node', 'click-select'],
                    addEdge: ['click-add-edge', 'click-select'],
                    addCurveEdge: ['click-add-edge', 'click-select']
                },
                defaultCombo: {
                    type: this.comboType,
                    style: {
                        lineWidth: 1,
                        lineDash: [5, 5]
                    },
                    labelCfg: {
                        refY: 26,
                        position: 'bottom',
                        style: {
                            fontSize: 18,
                        }
                    }
                },
                defaultNode: {
                    type: 'circle',
                    size: 30,
                    color: '#f1948a',
                    style: {
                        fill: 'red',
                        stroke: '#5B8FF9',
                        cursor: 'crosshair'
                    }
                },
                defaultEdge: {
                    color: '#5faee3',
                    style: {
                        stroke: '#5faee3',
                        lineWidth: 2
                        // strokeOpacity: 1
                    },
                },
                comboStateStyles: {
                    // 鼠标 hover 状态下 combo 样式
                    hover: {
                        lineWidth: 3
                    },
                },
                nodeStateStyles: {
                    // 鼠标 hover 状态下节点样式
                    hover: {
                        lineWidth: 3
                    },
                },
                // plugins: [this.gridPlugin], // 将 grid 实例配置到图上
            });
            this.graph.data(this.value);
            this.graph.render();
            // this.graph.on('combo:mouseenter', evt => {
            //     const { item } = evt;
            //     this.graph.setItemState(item, 'hover', true);
            // });

            // this.graph.on('combo:mouseleave', evt => {
            //     const { item } = evt;
            //     this.graph.setItemState(item, 'hover', false);
            // });
            this.graph.on('node:dblclick', ev => {
                const shape = ev.target;
                const node = ev.item;
                this.$emit('getNodeDetails', node);
                // alert(`你点击的节点是${node._cfg.model.label},节点坐标X:${node._cfg.model.x},Y:${node._cfg.model.y}`)
            });
        },
        save() {
            const _t = this;
            const changeData = _t.graph.save();
            console.log(JSON.stringify(changeData));
        },
        selectChange(e) {
            const _t = this;
            const value = e.target.value;
            _t.graph.setMode(value);
        },
        interaction(value) {
            const _t = this;
            _t.registerLine(value);
            _t.graph.setMode(value);
        },
        zoom(data) {
            const _t = this;
            const value = data;
            const width = _t.graph.get('width');
            const height = _t.graph.get('height');
            // 缩放率
            let ratio = 1;
            let center;
            center = {
                x: width / 2,
                y: height / 2
            };
            // _t.graph.setMode(value);
            if (['zoomIn', 'zoomOut'].includes(value)) {
                const currentRatio = _t.graph.getZoom();
                const step = 0.1;
                ratio = value === 'zoomOut' ? currentRatio - step : currentRatio + step
                ratio = ratio.toFixed(1);
                // 缩放视窗窗口到一个固定比例
                _t.graph.zoomTo(ratio, center);
            } else if (value === 'actualSize') {
                ratio = 1
                _t.graph.zoomTo(ratio, center)
            }

        },
        fitScreen() {
            const _t = this;
            _t.graph.fitView();
        }
    }
};
</script>

<style lang="scss">
@import "@/styles/_var.scss";
.container {
    width: 100%;
    height: 500px;
}
</style>