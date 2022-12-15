import { defineStore } from "pinia";

export const useComponentStore = defineStore("main", {
    state: () => ({
        currentelement: 'test',
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
        }
    }
})