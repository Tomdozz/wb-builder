import { defineStore } from "pinia";

export const useComponentStore = defineStore("main", {
    state: () => ({
        currentelement: 'test'
    }),
    getters: {
        getCurrentAsString: state => {
            state.currentelement.toString();
        }
    },
    actions: {
        reset(){
            this.currentelement = '';
        },
        setNewActive(val){
            this.currentelement = val;
        }
    }
})