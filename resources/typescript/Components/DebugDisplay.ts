import { $ } from '../utils';
import { WindowObjectWithDataLayer, DatalayerEvent } from 'types';

export const DebugDisplay = (() => {

    const Selector = {
        DEBUG_DISPLAY: '.js_debug_object_display',
    }

    const template: string = `
        <div style="margin: 10px; background-color: #505050;">
            ${render()}
        </div>
    `;

    function mount() {
        $(Selector.DEBUG_DISPLAY).innerHTML = template;
    }
    // eventsArray: Event[]
    function render(templateToReplace?: string) {
        if (templateToReplace) {
            $(Selector.DEBUG_DISPLAY).innerHTML = templateToReplace;
        }
    }

    function injectEventToView() {
        
    }

    return {
        mount,
        render
    }
})();