/**
 * Copyright 2026 jtarchb
 * @license Apache-2.0
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class PlayListDot extends DDDSuper(LitElement) {
  static get tag() {
    return "play-list-dot";
  }

  static properties = {
    active: { type: Boolean, reflect: true },
    index: { type: Number },
  };

  constructor() {
    super();
    this.active = false;
    this.index = 0;
  }

  static styles = [
    super.styles,
    css`
      :host {
        display: inline-flex;
      }

      button {
        width: 16px;
        height: 16px;
        border: none;
        border-radius: 50%;
        margin-right: 14px;
        background: var(--ddd-theme-default-slateMaxLight
);
        cursor: pointer;
        padding: 0;
      }

      button.active {
        background: var(--ddd-theme-default-beaverBlue);
      }
    `,
  ];

  render() {
    return html`
      <button
        class=${this.active ? "active" : ""}
        @click=${this._click}
        aria-label="Go to slide ${this.index + 1}"
      ></button>
    `;
  }

  _click() {
    this.dispatchEvent(
      new CustomEvent("dot-click", {
        bubbles: true,
        composed: true,
        detail: { index: this.index },
      })
    );
  }
}

customElements.define(PlayListDot.tag, PlayListDot);