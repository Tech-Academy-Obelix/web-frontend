import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useClassesStore = defineStore('classes', () => {
    const classes = ref([
        {
            id: 0,
            name: 'Class 1',
            description: 'This is the first class',
        },
        {
            id: 1,
            name: 'Class 2',
            description: 'This is the second class',
        },
        {
            id: 2,
            name: 'Class 3',
            description: 'This is the third class',
            assignments: [
                {
                    id: 0,
                    name: 'Assignment 1',
                    description: 'This is the first assignment',
                },
                {
                    id: 1,
                    name: 'Assignment 2',
                    description: 'This is the second assignment',
                },
                {
                    id: 2,
                    name: 'Assignment 3',
                    description: 'This is the third assignment',
                },
            ]
        },
        {
            id: 3,
            name: 'Class 4',
            description: 'This is the fourth class',
        },
        {
            id: 4,
            name: 'Class 5',
            description: 'This is the fifth class',
        },
        {
            id: 5,
            name: 'Class 6',
            description: 'This is the sixth class',
        },
        {
            id: 6,
            name: 'Class 7',
            description: 'This is the seventh class',
        },
        {
            id: 7,
            name: 'Class 8',
            description: 'This is the eighth class',
        },
        {
            id: 8,
            name: 'Class 9',
            description: 'This is the ninth class',
        },
        {
            id: 9,
            name: 'Class 10',
            description: 'This is the tenth class',
        },
    ])

    return {
        classes
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useClassesStore, import.meta.hot))
}