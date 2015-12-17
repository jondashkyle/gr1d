/**
 * UMD
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.Gr1d = factory()
  }
}(this, function () {
  /**
   * Gr1d
   */
  return function (opts) {
    var self = this
    var opts = opts || { }

    /**
     * Options
     */
    var options = {
      container: opts.container || document.body,
      pad: opts.pad || 0,
      gutter: opts.gutter || false,
      responsive: opts.responsive || true,
    }

    /**
     * Elements
     */
    var el = options.container

    /**
     * UI
     */
    this.ui = {

    }

    /**
     * Row
     */
    this.row = {
      add: function add (pd, gtr) {
        var row = document.createElement('div')

        row.classList.add('x', 'xw', 'p' + pd, 'g' + (gtr ? (pd * 2) : 0))
        row.setAttribute('data-gr1d-row', '')
        el.appendChild(row)

        return row
      },

      fill: function fill (cl, pad, gutter, responsive) {
        var row = self.row.add(pad, gutter)
        if (typeof cl === 'number' && (cl % 1) === 0) {
          for (var i = 0; i < cl; i++) {
            self.col.add(row, 'xx', pad, responsive)
          }
        } else if (typeof cl === 'object' && Array.isArray(cl)) {
          for (var i = 0; i < cl.length; i++) {
            self.col.add(row, cl[i], pad, responsive)
          }
        } else {
          error('Please pass valid column option.')
        }
      }
    }

    /**
     * Column
     */
    this.col = {
      add: function add (row, cls, pd, rspnsv) {
        var col = document.createElement('div')
        cls = cls.trim()

        // Responsive
        if (rspnsv) {
          col.classList.add('sm-c12')
        }

        // Span
        if (cls !== 'xx') {
          cls = parseInt(cls)
          if (cls <= 0) {
            error('Please pass a column size greater than 0.')
            return
          } else if (cls >= 13) {
            error('Please pass a column size less than 12.')
            return
          } else {
            col.classList.add('c' + parseInt(cls))
          }
        } else {
          col.classList.add(cls)
        }

        // Padding and placeholder
        col.classList.add('p' + pd)
        col.innerHTML = 'Lorum Ipsum…'

        // Setup and add
        col.setAttribute('data-gr1d-col', '')
        col.setAttribute('contenteditable', '')
        row.appendChild(col)

        return col
      }
    }

    /**
     * Add
     */
    this.add = function add (cl, pd, gtr, rspnsv) {
      var col, pad, gutter, responsive

      // Build the options
      if (typeof cl === 'object' && ! Array.isArray(cl)) {
        col = cl.col
        pad = cl.pad
        gutter = cl.gutter
        responsive = cl.responsive
      } else if (cl) {
        col = cl
        pad = pd
        gutter = gtr
        responsive = rspnsv
      } else {
        error('Please provide options')
        return self
      }

      // Defaults
      pad = util.isInt(parseInt(pad), options.pad)
      gutter = util.isBool(gutter, options.gutter)
      responsive = util.isBool(responsive, options.responsive)

      // Fill the row
      self.row.fill(col, pad, gutter, responsive)
      return self
    }

    /**
     * Utilities
     */
    var util = {
      isBool: function isBool (bool, fallback) {
        if (typeof bool === 'boolean') {
          return bool
        } else {
          return fallback
        }
      },
      isInt: function isInt (int, fallback) {
        if (typeof int === 'number' && (int % 1) === 0) {
          return int
        } else {
          return fallback
        }
      }
    }

    /**
     * Error handling
     */
    var error = options.error || function error (msg) {
      console.warn('Gr1d: ' + msg)
    }

    /**
     * Setup
     */
    this.setup = function setup () {
      return self
    }

    // Export
    return this
  }
}));