import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class PlayListArrow extends DDDSuper(LitElement) {
  static get tag() {
    return "play-list-arrow";
  }

  static properties = {
    direction: { type: String },
  };

  constructor() {
    super();
    this.direction = "left";
  }

  static styles = [
    super.styles,
    css`
      button {
        width: 44px;
        height: 44px;
        border-radius: var(--ddd-radius-circle);
        border: 2px solid var(--ddd-theme-default-beaverBlue);
        background: white;
        color: var(--ddd-theme-default-beaverBlue);
        cursor: pointer;
        font-size: 22px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      button:hover {
        background: var(--ddd-theme-default-beaverBlue);
        color: white;
      }
    `,
  ];

  render() {
    const label =
      this.direction === "left" ? "Previous slide" : "Next slide";

    return html`
      <button @click=${this._click} aria-label=${label}>
        ${this.direction === "left" ? "‹" : "›"}
      </button>
    `;
  }

  _click() {
    this.dispatchEvent(
      new CustomEvent("arrow-click", {
        bubbles: true,
        composed: true,
        detail: { direction: this.direction },
      })
    );
  }
}

customElements.define(PlayListArrow.tag, PlayListArrow);