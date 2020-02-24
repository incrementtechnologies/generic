import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
export default {
  id: 'createSysteNotificationModal',
  size: 'modal-md',
  title: 'Add System Notification',
  background: null,
  inputs: [{
    row: 'full',
    label: 'Devices',
    variable: 'device',
    placeholder: 'Enter device',
    value: null,
    required: true,
    id: 'device',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Title',
    variable: 'title',
    placeholder: 'Enter title',
    value: null,
    required: true,
    id: 'title',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Description',
    variable: 'description',
    placeholder: 'Enter description',
    value: null,
    required: true,
    id: 'description',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Payload',
    variable: 'payload',
    placeholder: 'Enter payload',
    value: null,
    required: true,
    id: 'payload',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 1,
      type: 'text'
    }
  }],
  route: 'system_notifications/create',
  button: {
    left: 'Cancel',
    right: 'Submit'
  },
  sort: null,
  params: [{
    variable: 'account_id',
    value: null
  }]
}
