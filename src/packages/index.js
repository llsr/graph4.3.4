// 所有的组件的入口
import TopologicalShow from './topological-graph/topological-show';
import TopologicalGraph from './topological-graph/topological-graph';
const install = (Vue) => {
    Vue.component(TopologicalGraph.name, TopologicalGraph);
    Vue.component(TopologicalShow.name, TopologicalShow);
};

// 有可能组件会通过script标签的方式引入
// <script src="xc-ui"></script>

if (typeof window.Vue !== 'undefined') {
    install(Vue); // 全局直接通过script 引用的方式会默认调用install方法
}

export default {
    install
};
