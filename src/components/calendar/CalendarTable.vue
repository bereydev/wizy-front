<script setup lang="ts">
import { ICalendarItem, INormalizedCalendarItem } from "./ICalendarItem"
import CalendarMath from "./CalendarMath"
const showDate = ref(new Date())
const selectionStart = ref<Date>(new Date)
const selectionEnd = ref<Date>(new Date)
const theme = ref<string>("")
const items = ref<Array<ICalendarItem>>([])

// TODO change add theme option interface
const themeOptions = computed<any>(() => {
	return theme.value == "gcal"
		? {
			top: "2.6em",
			height: "2.1em",
			border: "0px",
			previousYearLabel: "\uE5CB\uE5CB",
			previousPeriodLabel: "\uE5CB",
			nextPeriodLabel: "\uE5CC",
			nextYearLabel: "\uE5CC\uE5CC",
			currentPeriodLabel: "Today",
		}
		: {
			top: "1.4em",
			height: "1.4em",
			border: "2px",
			previousYearLabel: "<<",
			previousPeriodLabel: "<",
			nextPeriodLabel: ">",
			nextYearLabel: ">>",
			currentPeriodLabel: "",
		}
})

onMounted(() => {
	items.value = [...Array(25)].map((_, i) => getRandomEvent(i))
})


function setShowDate(d: Date) {
	console.log('input registered')
	showDate.value = d
}
function setSelection(dateRange: Array<Date>) {
	selectionEnd.value = dateRange[1]
	selectionStart.value = dateRange[0]
}
function finishSelection(dateRange: Array<Date>) {
	setSelection(dateRange)
}
function getRandomEvent(index: number): ICalendarItem {
	const startDay = Math.floor(Math.random() * 28 + 1)
	const endDay = Math.floor(Math.random() * 4) + startDay
	var d = new Date()
	var i = {
		id: index.toString(),
		title: "Event " + (index + 1),
		startDate: new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), startDay)),
		endDate: new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), endDay)),
		classes: Math.random() > 0.9 ? ["custom-date-class-red"] : null,
	}
	return i
}
function onDrop(item: INormalizedCalendarItem, date: Date) {
	// Determine the delta between the old start date and the date chosen,
	// and apply that delta to both the start and end date to move the item.
	const eLength = CalendarMath.dayDiff(item.startDate, date)
	item.originalItem.startDate = CalendarMath.addDays(item.startDate, eLength)
	item.originalItem.endDate = CalendarMath.addDays(item.endDate, eLength)
}

</script>

<template>
	<calendar-view
		:show-date="showDate"
		:items="items"
		:enable-date-selection="true"
		:selection-start="selectionStart"
		:selection-end="selectionEnd"
		:display-week-numbers="false"
		:enable-drag-drop="true"
		:item-top="themeOptions.top"
		:item-content-height="themeOptions.height"
		:item-border-height="themeOptions.border"
		:class="`theme-` + theme"
		:current-period-label="themeOptions.currentPeriodLabel"
		class="holiday-us-traditional holiday-us-official"
		@date-selection-start="setSelection"
		@date-selection="setSelection"
		@date-selection-finish="finishSelection"
		@drop-on-date="onDrop"
	>
		<template #header="{ headerProps }">
			<calendar-view-header
				:header-props="headerProps"
				:previous-year-label="themeOptions.previousYearLabel"
				:previous-period-label="themeOptions.previousPeriodLabel"
				:next-period-label="themeOptions.nextPeriodLabel"
				:next-year-label="themeOptions.nextYearLabel"
				@input="setShowDate"
			/>
		</template>
	</calendar-view>
</template>

<style>
@import "./css/gcal.css";

/* @import "../static/css/default.css"; */
@import "./css/holidays-us.css";

.cv-item.custom-date-class-red {
	background-color: #f66;
}
</style>