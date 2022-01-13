<script setup lang="ts">
const events = [0,1,2,3,4,5]
</script>

<template>
<div class="timeline-client">
                    <a v-for="event in events"  :key="event" class="timeline__item-container">
                        <span id="event_id" class="inline-block timeline__item timeline__item--client"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="bottom"
                            data-trigger="hover"
                            data-title="Event name"
                            style="background-color: blue">
                            {{event}}
                        </span>
                    </a>
           
                </div>
</template>

<style lang="css">
/* ==================================================================
   Timeline style
==================================================================
 Display timeline for unique client */

.timeline-client {
	 position: absolute;
	 display: flex;
	 align-items: center;
	 justify-content: center;
	 text-align: center;
	 max-width: 100%;
	 bottom: 2rem;
	 left: 50%;
	 transform: translateX(-50%);
}
 .timeline-client:before {
	 content: '';
	 position: absolute;
	 width: calc(100% - 1rem);
	 height: 1px;
	 z-index: -1;
	 background-color: #676767;
}
 .timeline__item-container {
	 display: block;
	 width: 32px;
	 height: 32px;
	 padding: 0 0.2rem;
	 box-sizing: content-box;
	 transition: ease 0.2s;
}
 .timeline__item-container:hover, .timeline__item-container:not(.collapsed) {
	 width: auto;
	 min-width: 32px;
	 padding: 0 0.75rem;
	 z-index: 10;
}
 .timeline__item-container:hover .timeline__item--client, .timeline__item-container:not(.collapsed) .timeline__item--client {
	 position: relative;
}
 .timeline__item-container:hover .timeline__item--client:before, .timeline__item-container:not(.collapsed) .timeline__item--client:before {
	 transform: scale(1.3);
	 border: 1px solid #676767;
}
 .timeline__item--client {
	 position: absolute;
	 left: 0;
	 right: 0;
	 margin: auto;
	 width: 32px !important;
	 height: 32px !important;
	 line-height: 32px;
	 transition: ease 0.2s;
}
 .timeline__item--client:before {
	 content: "";
	 position: absolute;
	 top: 0;
	 left: 0;
	 width: 100%;
	 height: 100%;
	 background-color: grey;
	 border: 1px solid grey;
	 border-radius: 50%;
	 z-index: -1;
	 transition: ease 0.2s;
}
</style>