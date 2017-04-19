/**
 * Created by summer on 17/4/9.
 */
import Vue from 'vue';
import events from './events';

const eventHub = new Vue();

const keyboard = {
  open (info) {
    eventHub.$emit(events.TOGGLE_NUM_KEYBOARD, info);
  },
  close (info) {
    eventHub.$emit(events.TOGGLE_NUM_KEYBOARD, info);
  },
  value (val) {
    eventHub.$emit(events.KEYBOARD_VALUE, val);
  }
};

export { keyboard };
export default eventHub;