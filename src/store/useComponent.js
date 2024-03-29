import { defineStore } from "pinia";

export const useComponentStore = defineStore("main", {
    state: () => ({
        currentelement: '0',
        toolBoxPosition: {},
        componentList: [],
        dropElement: {}
    }),
    getters: {
        getCurrentAsString: state => {
            state.currentelement.toString();
        },
        getComponentList: state => {
            state.componentList; 
        },
        getDropElement: state => {
            state.dropElement; 
        },
        isDropEmpty() {
            return JSON.stringify(this.dropElement) === '{}';
        },
        isCurrerntElementEmpty(){
            return customElements === '0';
        },
        getToolBoxPosition: state => {
            state.toolBoxPosition;
        }
    },
    actions: {
        reset(){
            this.currentelement = '';
        },
        setNewActive(val){
            this.currentelement = val;
        },
        resetComponentList(){
            this.currentelement = [];
        },
        setComponentList(val){
            this.componentList = val;
        },
        setDropElement(val){
            this.dropElement = val;
        },
        clearDropElemet(){
            this.dropElement = {}
        },
        setToolBoxPosition(val){
            this.toolBoxPosition = val;
        }
    }
})