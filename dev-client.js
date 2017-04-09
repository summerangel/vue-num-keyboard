/**
 * Created by summer on 17/4/9.
 */
var hotClient = require('webpack-hot-middleware/client')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})