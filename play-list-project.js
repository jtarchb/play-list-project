import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

import "./play-list-slide.js";
import "./play-list-arrow.js";
import "./play-list-dot.js";

export class PlayListProject extends DDDSuper(LitElement) {
  static get tag() {
    return "play-list-project";
  }

  static properties = {
    index: { type: Number, reflect: true },
    _slideCount: { state: true },
  };

  constructor() {
    super();
    this.index = 0;
    this._slideCount = 0;
  }

  static styles = [
    super.styles,
    css`
      :host {
        display: block;
        position: relative;
        border: var(--ddd-border-md);
        border-radius: var(--ddd-radius-lg);
        background: var(--ddd-theme-default-slateLight);
        overflow: hidden;
        padding: 0 var(--ddd-spacing-8);
      }

      .slides {
        display: flex;
        transition: transform 0.4s ease;
        height: 420px;
      }

      ::slotted(play-list-slide) {
        min-width: 100%;
      }

      .arrows {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        transform: translateY(-50%);
        pointer-events: none;
      }

      play-list-arrow {
        pointer-events: auto;
      }

      .dots {
        display: flex;
        padding: var(--ddd-spacing-4);
      }
    `,
  ];

  render() {
    return html`
      <div
        class="slides"
        style="transform: translateX(-${this.index * 100}%);"
      >
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>

      <div class="arrows">
        <play-list-arrow direction="left"></play-list-arrow>
        <play-list-arrow direction="right"></play-list-arrow>
      </div>

      <div class="dots">
        ${Array.from({ length: this._slideCount }).map(
          (_, i) =>
            html`<play-list-dot
              .index=${i}
              .active=${i === this.index}
            ></play-list-dot>`
        )}
      </div>
    `;
  }

  _handleSlotChange(e) {
    const slides = e.target
      .assignedElements({ flatten: true })
      .filter(el => el.tagName?.toLowerCase() === "play-list-slide");

    this._slideCount = slides.length;
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("arrow-click", e => {
      if (!this._slideCount) return;

      this.index =
        e.detail.direction === "left"
          ? (this.index - 1 + this._slideCount) % this._slideCount
          : (this.index + 1) % this._slideCount;
    });

    this.addEventListener("dot-click", e => {
      this.index = e.detail.index;
    });
  }
}

customElements.define(PlayListProject.tag, PlayListProject);