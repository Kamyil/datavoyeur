import { $ } from './utils';
import { DebugDisplay } from 'Components/DebugDisplay';
import { useObserver } from 'Services/ArrayObserver';
import { DatalayerEvent, WindowObjectWithDataLayer } from 'types';

const Datavoyeur = (() => {

    /**
     * This variable is official connector between Analytics datalayer
     * injected via script (like GTM, Criteo, FB etc.) with Datavoyeur extension. 
     * It's observed by default, to make be able to work on last fresh state updated dataLayer
     * only and don't trigger state update manually in code later
     */
    const dataLayer: DatalayerEvent[] = useObserver((
            window as unknown as WindowObjectWithDataLayer
        ).dataLayer, 
        handleDatalayerChange
    );

    // Declare list of extension's selectors to easly manipulate them later
    const Selector = {
        CONTAINER: '',
        EVENTS_DISPLAY: '.js_events_display',
        DEBUG_OBJECT_DISPLAY: '.js_debug_object_display'
    }

    function run() {
        // DebugDisplay.mount();
        handleDatalayerChange();
        handleDummyButton();
    }

    function handleDatalayerChange() {
        console.log('datalayer has changed', dataLayer);
        DebugDisplay.render(JSON.stringify(dataLayer));
    }

    function handleDummyButton() {
        document.getElementById('sendGtmEvent').addEventListener('click', function () {
            dataLayer.push({
                id: 1,
                event: 'eventName'
            });
        });
    }

    // Global listeners
    window.addEventListener('load', run);
})();