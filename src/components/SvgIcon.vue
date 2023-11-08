<template>
    <svg :class="svgClass" :style="sizeStyle" aria-hidden="true">
        <use :xlink:href="iconName" :fill="color"/>
    </svg>
</template>

<script setup>

import { computed } from 'vue'

const props = defineProps({
    iconClass: {
        type: String,
        required: true
    },
    className: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: ''
    }
})

const iconName = computed(() => {
    return `#icon-${props.iconClass}`
})
const svgClass = computed(() => {
    if (props.className) {
        return `svg-icon ${props.className}`
    }
    return 'svg-icon'
})
const sizeStyle = computed(() => {
    return `width: ${props.size}px;height: ${props.size}px`
})

</script>