<template>
    <div>
        <div class="operation">
            <div class="btn" :class="activeClass == 0 ? 'active' : ''" @click="interaction('default')">
                移动
            </div>
            <div class="btn" :class="activeClass == 1 ? 'active' : ''" @click="interaction('addEdge')">
                直线
            </div>
            <div class="btn" :class="activeClass == 2 ? 'active' : ''" @click="interaction('addCurveEdge')">
                曲线
            </div>
            <div class="btn" :class="activeClass == 3 ? 'active' : ''" @click="zoom('zoomIn')">
                放大
            </div>
            <div class="btn" :class="activeClass == 4 ? 'active' : ''" @click="zoom('zoomOut')">
                缩小
            </div>
            <div class="btn" :class="activeClass == 5 ? 'active' : ''" @click="zoom('actualSize')">
                实际大小
            </div>
            <div class="btn" :class="activeClass == 6 ? 'active' : ''" @click="fitScreen">
                适应屏幕
            </div>
            <div class="btn" :class="activeClass == 7 ? 'active' : ''" @click="save">
                保存
            </div>
        </div>
        <!-- <topological-graph @getNodeDetails="getNodeDetails" :value="graphData" :comboType="comboType" ref="topologicalGraph"></topological-graph> -->
        <topological-show @getNodeDetails="getNodeDetails" :value="graphDataShow" :comboType="comboType" ref="topologicalGraph"></topological-show>
    </div>
</template>

<script>
import picture from './assets/img/logo.png';
import jhj3 from './assets/img/jhj3.png';
import jhj from './assets/img/jhj.png';
import zj from './assets/img/zj.png';
export default {
    created(){
        // this.getShowInitData();
    },
    methods: {
        getShowInitData(){
            this.graphDataShow.nodes =  this.graphDataShow.nodes.map(item=>{
                return {
                    id: item.id,
                    information: item.information,
                    img: item.img,
                    comboId: item.comboId,
                    text: item.text,
                    x: this.randomNum(1200,500),
                    y: this.randomNum(1200,500)
                }
            })
        },
        randomNum(minNum, maxNum) {
            switch (arguments.length) {
                case 1:
                    return parseInt(Math.random() * minNum + 1, 10);
                    break
                case 2:
                    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                    break
                default:
                    return 0;
            }
        },
        // 获取节点详情信息
        getNodeDetails(nodeDetails) {
            alert(`你点击的节点是${nodeDetails._cfg.model.text},节点坐标X:${nodeDetails._cfg.model.x},Y:${nodeDetails._cfg.model.y}`);
        },
        save() {
            this.activeClass = 7;
            this.$refs.topologicalGraph.save();
        },
        fitScreen() {
            this.activeClass = 6;
            this.$refs.topologicalGraph.fitScreen();
        },
        zoom(val) {
            switch (val) {
                case 'zoomIn':
                    this.activeClass = 3;
                    break;
                case 'zoomOut':
                    this.activeClass = 4;
                    break;
                case 'actualSize':
                    this.activeClass = 5;
                    break;
            }
            this.$refs.topologicalGraph.zoom(val);
        },
        interaction(val) {
            switch (val) {
                case 'default':
                    this.activeClass = 0;
                    break;
                case 'addEdge':
                    this.activeClass = 1;
                    break;
                case 'addCurveEdge':
                    this.activeClass = 2;
                    break;
            }
            this.$refs.topologicalGraph.interaction(val);
            // console.log(1);
        }
    },
    data() {
        return {
            comboType: 'circle',
            activeClass: -1,
            graphData: {
                nodes: [
                    {
                        id: 'node6',
                        img: 'https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000',
                        comboId: 'comboC',
                        label: 'node6',
                        x: 384.1229854405311,
                        y: 290.5343448239
                    },
                    {
                        id: 'node1',
                        label: 'node1',
                        comboId: 'comboA',
                        x: 283.43342222459773,
                        y: 110.17133486778448
                    },
                    {
                        id: 'node9',
                        label: 'node9',
                        comboId: 'comboB',
                        x: 580.2722574670867,
                        y: 80.10686896477999
                    },
                    {
                        id: 'node2',
                        label: 'node2',
                        comboId: 'comboA',
                        x: 245.43342222459773,
                        y: 95.17133486778448
                    },
                    {
                        id: 'node3',
                        label: 'node3',
                        comboId: 'comboA',
                        x: 275.43342222459773,
                        y: 52.17133486778448
                    },
                    {
                        id: 'node7',
                        comboId: 'comboB',
                        label: 'node7',
                        x: 569.2722574670867,
                        y: 135.10686896478
                    },
                    {
                        id: 'node10',
                        label: 'node10',
                        comboId: 'comboC',
                        x: 470.1229854405311,
                        y: 261.5343448239
                    }
                ],
                edges: [
                    {
                        source: 'node1',
                        target: 'node2',
                        color: '#5faee3',
                        style: {
                            stroke: '#5faee3',
                            lineWidth: 2
                        },
                        id: 'edge1',
                        startPoint: {
                            x: 269.01601629396225,
                            y: 104.48025357937573
                        },
                        endPoint: {
                            x: 259.8508281552332,
                            y: 100.86241615619323
                        }
                    },
                    {
                        source: 'node2',
                        target: 'node3',
                        color: '#5faee3',
                        style: {
                            stroke: '#5faee3',
                            lineWidth: 2
                        },
                        id: 'edge2',
                        startPoint: {
                            x: 254.302236962971,
                            y: 82.45936707611614
                        },
                        endPoint: {
                            x: 266.5646074862245,
                            y: 64.88330265945282
                        }
                    },
                    {
                        source: 'node6',
                        target: 'node1',
                        color: '#5faee3',
                        type: 'arc',
                        curveOffset: 40,
                        style: {
                            stroke: '#5faee3',
                            lineWidth: 2
                        },
                        id: 'edge5',
                        startPoint: {
                            x: 376.5675606453251,
                            y: 277.00047781686965
                        },
                        endPoint: {
                            x: 290.98884701980376,
                            y: 123.70520187481489
                        }
                    },
                    {
                        source: 'node10',
                        target: 'node7',
                        color: '#5faee3',
                        type: 'arc',
                        curveOffset: 40,
                        style: {
                            stroke: '#5faee3',
                            lineWidth: 2
                        },
                        id: 'edge6',
                        startPoint: {
                            x: 479.68808505147166,
                            y: 249.3376703003758
                        },
                        endPoint: {
                            x: 559.7071578561461,
                            y: 147.30354348830423
                        }
                    },
                    {
                        source: 'node3',
                        target: 'node9',
                        type: 'arc',
                        curveOffset: 40,
                        color: '#5faee3',
                        style: {
                            stroke: '#5faee3',
                            lineWidth: 2
                        },
                        id: 'edge7',
                        startPoint: {
                            x: 290.86874518128076,
                            y: 53.58583309079322
                        },
                        endPoint: {
                            x: 564.8369345104037,
                            y: 78.69237074177124
                        }
                    }
                ],
                combos: [
                    {
                        id: 'comboA',
                        label: '办公区',
                        children: [
                            {
                                id: 'node1',
                                comboId: 'comboA',
                                itemType: 'node',
                                depth: 1
                            },
                            {
                                id: 'node2',
                                comboId: 'comboA',
                                itemType: 'node',
                                depth: 1
                            },
                            {
                                id: 'node3',
                                comboId: 'comboA',
                                itemType: 'node',
                                depth: 1
                            }
                        ],
                        depth: 0,
                        // type: "circle",
                        style: {
                            hover: {
                                lineWidth: 3
                            },
                            lineWidth: 1,
                            lineDash: [5, 5],
                            r: 56.30719314616916,
                            width: 69,
                            height: 89
                        },
                        labelCfg: {
                            refY: 26,
                            position: 'bottom',
                            style: {
                                fontSize: 18
                            }
                        },
                        x: 264.43342222459773,
                        y: 81.17133486778448
                    },
                    {
                        id: 'comboB',
                        label: '核心区',
                        children: [
                            {
                                id: 'node9',
                                comboId: 'comboB',
                                itemType: 'node',
                                depth: 1
                            },
                            {
                                id: 'node7',
                                comboId: 'comboB',
                                itemType: 'node',
                                depth: 1
                            }
                        ],
                        depth: 0,
                        // type: "circle",
                        style: {
                            hover: {
                                lineWidth: 3
                            },
                            lineWidth: 1,
                            lineDash: [5, 5],
                            r: 47.8539444560216,
                            width: 42,
                            height: 86.00000000000001
                        },
                        labelCfg: {
                            refY: 26,
                            position: 'bottom',
                            style: {
                                fontSize: 18
                            }
                        },
                        x: 574.7722574670867,
                        y: 107.60686896478
                    },
                    {
                        id: 'comboC',
                        label: '生产区',
                        children: [
                            {
                                id: 'node6',
                                comboId: 'comboC',
                                itemType: 'node',
                                depth: 1
                            },
                            {
                                id: 'node10',
                                comboId: 'comboC',
                                itemType: 'node',
                                depth: 1
                            }
                        ],
                        depth: 0,
                        // type: "circle",
                        style: {
                            hover: {
                                lineWidth: 3
                            },
                            lineWidth: 1,
                            lineDash: [5, 5],
                            r: 65.74382100243336,
                            width: 117,
                            height: 60
                        },
                        labelCfg: {
                            refY: 26,
                            position: 'bottom',
                            style: {
                                fontSize: 18
                            }
                        },
                        x: 427.1229854405311,
                        y: 276.0343448239
                    },
                    {
                        id: 'comboD',
                        label: 'combo D',
                        depth: 0,
                        // type: "circle",
                        style: {
                            hover: {
                                lineWidth: 3
                            },
                            lineWidth: 1,
                            lineDash: [5, 5],
                            r: 10,
                            width: 20,
                            height: 5
                        },
                        labelCfg: {
                            refY: 26,
                            position: 'bottom',
                            style: {
                                fontSize: 18
                            }
                        },
                        x: 96.16800146968481,
                        y: 84.62113856825712
                    }
                ]
            },
            graphDataShow: {
                nodes: [
                    {
                        id: 'node6',
                        information: 8,
                        // img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg?max_age=31536000',
                        img: zj,
                        comboId: 'comboC',
                        text: 'node6',
                        x: 384.1229854405311,
                        y: 290.5343448239
                    },
                    {
                        id: 'node1',
                        information: 0,
                        img: zj,
                        text: 'node1',
                        comboId: 'comboA',
                        x: 300.43342222459773,
                        y: 120.17133486778448
                    },
                    {
                        id: 'node9',
                        information: 0,
                        img: jhj2,
                        text: 'node9',
                        comboId: 'comboB',
                        x: 580.2722574670867,
                        y: 80.10686896477999
                    },
                    {
                        id: 'node2',
                        information: 6,
                        img: zj,
                        text: 'node2',
                        comboId: 'comboA',
                        x: 115.43342222459773,
                        y: 110.17133486778448
                    },
                    {
                        id: 'node3',
                        information: 0,
                        img: jhj3,
                        text: 'node3',
                        comboId: 'comboA',
                        x: 275.43342222459773,
                        y: 52.17133486778448
                    },
                    {
                        id: 'node7',
                        information: 0,
                        img: jhj3,
                        comboId: 'comboB',
                        text: 'node7',
                        x: 569.2722574670867,
                        y: 155.10686896478
                    },
                    {
                        id: 'node10',
                        information: 0,
                        img: zjjhj3,
                        text: 'node10',
                        comboId: 'comboC',
                        x: 470.1229854405311,
                        y: 261.5343448239
                    }
                ],
                edges: [
                    {
                        source: 'node1',
                        target: 'node2'
                    },
                    {
                        source: 'node2',
                        target: 'node3'
                    },
                    {
                        source: 'node6',
                        target: 'node1',
                        type: 'arc-running',
                        style: {
                            stroke: '#5faee3',
                            lineWidth: 2
                        }
                    },
                    {
                        source: 'node10',
                        target: 'node7',
                        type: 'arc-running',
                        style: {
                            stroke: '#5faee3',
                            lineWidth: 2
                        }
                    },
                    {
                        source: 'node3',
                        target: 'node9'
                    }
                ],
                combos: [
                    {
                        id: 'comboA',
                        label: '办公区',
                        padding:  50
                    },
                    {
                        id: 'comboB',
                        label: '核心区',
                        padding:  50
                    },
                    {
                        id: 'comboC',
                        label: '生产区',
                        padding:  50
                    },
                    {
                        id: 'comboD',
                        label: 'combo D',
                        padding:  50
                    }
                ]
            }
        };
    }
};
</script>

<style lang="scss">
.active {
    /* background: #eee; */
    color: #fff;
    background-color: darkviolet !important;
    font-weight: bolder;
}
.operation {
    position: absolute;
    left: 90%;
    bottom: 30%;
    .btn {
        width: 90px;
        height: 30px;
        background-color: deeppink;
        margin-bottom: 10px;
        text-align: center;
        line-height: 30px;
        &:hover {
            cursor: pointer;
            background-color: darkviolet;
            color: white;
        }
    }
}
</style>
