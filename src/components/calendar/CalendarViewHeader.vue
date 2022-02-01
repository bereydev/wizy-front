<script setup lang="ts">
import type { IHeaderProps } from "./IHeaderProps"

interface Props {
	headerProps: IHeaderProps,
	previousYearLabel: string
	previousPeriodLabel: string
	nextPeriodLabel: string
	nextYearLabel: string
}

const props = withDefaults(defineProps<Props>(),
	{
		previousYearLabel: "<<",
		previousPeriodLabel: "<",
		nextPeriodLabel: ">",
		nextYearLabel: ">>"
	}
)

const {
	previousYearLabel,
	previousPeriodLabel,
	nextPeriodLabel,
	nextYearLabel,
} = toRefs(props)


console.log(props.headerProps.previousPeriod)

const emit = defineEmits(["input"])


function onInput(d: Date) {
	console.log("input supposed to be sent")
	emit("input", d)
}
function test() {
	console.log("that is weird")
}

</script>

<template>
<button @click="onInput(props.headerProps.previousYear)">BUTTON</button>
	<div class="cv-header">
		<div class="cv-header-nav">
			<button
				:disabled="!props.headerProps.previousYear"
				class="previousYear"
				aria-label="Previous Year"
				@click="onInput(props.headerProps.previousYear)"
			>{{ previousYearLabel }}</button>
			<button
				:disabled="!props.headerProps.previousPeriod"
				class="previousPeriod"
				aria-label="Previous Period"
				@click="onInput(props.headerProps.previousPeriod)"
				v-html="previousPeriodLabel"
			/>
			<button
				class="currentPeriod"
				aria-label="Current Period"
				@click="onInput(props.headerProps.currentPeriod)"
			>{{ props.headerProps.currentPeriodLabel }}</button>
			<button
				:disabled="!props.headerProps.nextPeriod"
				class="nextPeriod"
				aria-label="Next Period"
				@click.prevent="onInput(props.headerProps.nextPeriod)"
			>{{ nextPeriodLabel }}</button>
			<button
				:disabled="!props.headerProps.nextYear"
				class="nextYear"
				aria-label="Next Year"
				@click.prevent="onInput(props.headerProps.nextYear)"
			>{{ nextYearLabel }}</button>
		</div>
		<div class="periodLabel">
			<slot name="label">{{ props.headerProps.periodLabel }}</slot>
		</div>
	</div>
</template>

<style>
.cv-header {
	display: flex;
	flex: 0 1 auto;
	flex-flow: row nowrap;
	align-items: center;
	min-height: 2.5em;
	border-width: 1px 1px 0 1px;
}

.cv-header .periodLabel {
	display: flex;
	flex: 1 1 auto;
	flex-flow: row nowrap;
	min-height: 1.5em;
	line-height: 1;
	font-size: 1.5em;
}

.cv-header,
.cv-header button {
	border-style: solid;
	border-color: #ddd;
}

.cv-header-nav,
.cv-header .periodLabel {
	margin: 0.1em 0.6em;
}

.cv-header-nav button,
.cv-header .periodLabel {
	padding: 0.4em 0.6em;
}

.cv-header button {
	box-sizing: border-box;
	line-height: 1em;
	font-size: 1em;
	border-width: 1px;
}
</style>
