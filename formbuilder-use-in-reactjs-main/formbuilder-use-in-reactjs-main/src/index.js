import $ from "jquery";
import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [
  {
    type: "header",
    subtype: "h1",
    label: "Global Form Enginer"
  },
  {
    type: "paragraph",
    label: "This is a simple example of using formBuilder in a React application. You can add more fields and customize the form as needed."
  }
];

/* 
The order of the imports and requires is very important, especially in the online enviornment.
The two jQuery libraries must be imported using Node's require(), and not ES6 import.
Also, these two requires MUST come after setting the global jQuery and $ symbols.

In my Babel/Webpack project, the type and order of the imports is a little less sensitive.
For my project, the following alternative works:

    import $ from 'jquery';
    import React from 'react';
    import ReactDOM from 'react-dom';
    import 'jquery-ui-sortable';

    window.jQuery = $;
    window.$ = $;

    require('formBuilder');
*/

class FormBuilder extends Component {
  fb = createRef();

  applyLayoutClasses = () => {
  $(".form-field").each(function () {
    $(this).removeClass(
      "layout-12 layout-6 layout-4"
    );

    const colSpan =
      $(this).attr("colspan") || "12";

    $(this).addClass(`layout-${colSpan}`);
  });
};
  componentDidMount() {
    this.formBuilder = $(this.fb.current).formBuilder({
      formData,

      typeUserAttrs: {
        text: {
          colSpan: {
            label: "Column Width",
            options: {
              "12": "Full Width",
              "6": "2 Columns",
              "4": "3 Columns"
            },
            value: "12"
          }
        },
        

        textarea: {
          colSpan: {
            label: "Column Width",
            options: {
              "12": "Full Width",
              "6": "2 Columns",
              "4": "3 Columns"
            },
            value: "12"
          }
        },

        number: {
          colSpan: {
            label: "Column Width",
            options: {
              "12": "Full Width",
              "6": "2 Columns",
              "4": "3 Columns"
            },
            value: "12"
          }
        },

        select: {
          colSpan: {
            label: "Column Width",
            options: {
              "12": "Full Width",
              "6": "2 Columns",
              "4": "3 Columns"
            },
            value: "12"
          }
        }
        
      },


      onAddFieldAfter: () => {
        setTimeout(() => {
          this.applyLayoutClasses();
        }, 100);
      },

      onOpenFieldEdit: () => {
        setTimeout(() => {
          this.applyLayoutClasses();
        }, 100);
      }
    });
    
  }

  render() {
    return (
      <div className="bg-gray-100 p-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="alert alert-info mb-4">
            Global Form Enginer is a powerful form builder that allows you to create complex forms with ease. It provides a user-friendly interface and a wide range of customization options, making it suitable for both beginners and experienced developers. With Global Form Enginer, you can quickly design and deploy forms for various purposes, such as surveys, registrations, and feedback collection.
          </div>
          <div id="fb-editor" ref={this.fb} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<FormBuilder />, document.getElementById("root"));
