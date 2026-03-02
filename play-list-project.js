 /**
 * Copyright 2026 jtarchb
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";


class PlayListSlide extends DDDSuper(LitElement) {
  static get tag() {
    return "play-list-slide";
  }

  static properties = {
    topHeading: { type: String, attribute: "top-heading" },
    secondHeading: { type: String, attribute: "second-heading" },
  };

  constructor() {
    super();
    this.topHeading = "";
    this.secondHeading = "";
  }

  static styles = [
    super.styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        min-width: 100%;
        height: 100%;
        padding: var(--ddd-spacing-8);
        box-sizing: border-box;
        background: var(--ddd-theme-default-slateLight);
        color: var(--ddd-theme-default-nittanyNavy);
      }

      .top {
        font-size: var(--ddd-font-size-sm);
        font-weight: var(--ddd-font-weight-bold);
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--ddd-theme-default-beaverBlue);
        margin-bottom: var(--ddd-spacing-2);
      }

      .second {
        font-size: var(--ddd-font-size-4xl);
        font-weight: var(--ddd-font-weight-bold);
        margin: 0 0 var(--ddd-spacing-4) 0;
        color: var(--ddd-theme-default-nittanyNavy);
      }

      .rule {
        width: 90px;
        height: 4px;
        border-radius: 99px;
        background: var(--ddd-theme-default-beaverBlue);
        margin-bottom: var(--ddd-spacing-4);
      }

      .content {
        flex: 1;
        overflow-y: auto;
        font-size: var(--ddd-font-size-md);
        line-height: 1.6;
        max-width: 700px;
      }
    `,
  ];

  render() {
    return html`
      <div class="top">${this.topHeading}</div>
      <div class="second">${this.secondHeading}</div>
      <div class="rule"></div>
      <div class="content">
        <slot></slot>
      </div>
    `;
  }
}


class PlayListArrow extends DDDSuper(LitElement) {
  static get tag() {
    return "play-list-arrow";
  }

  static properties = {
    direction: { type: String }, // "left" or "right"
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
        display: inline-flex;
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
    const label = this.direction === "left" ? "Previous slide" : "Next slide";
    return html`
      <button @click=${this._click} aria-label=${label}>
        ${this.direction === "left" ? "‹" : "›"}
      </button>
    `;
  }

  _click() {
    this.dispatchEvent(
      new CustomEvent("arrow-click", {
        composed: true,
        bubbles: true,
        detail: { direction: this.direction },
      })
    );
  }
}


class PlayListDot extends DDDSuper(LitElement) {
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
      button {
        width: 14px;
        height: 14px;
        border-radius: var(--ddd-radius-circle);
        border: none;
        margin-right: var(--ddd-spacing-3);
        background: var(--ddd-theme-default-slateMaxLight);
        cursor: pointer;
        transition: all 0.2s ease;
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


class PlayListProject extends DDDSuper(LitElement) {
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
        will-change: transform;
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
        padding: 0 var(--ddd-spacing-2);
      }

      play-list-arrow {
        pointer-events: auto;
      }

      .dots {
        display: flex;
        justify-content: flex-start;
        padding: var(--ddd-spacing-4) 0 var(--ddd-spacing-6)
          var(--ddd-spacing-8);
        background: var(--ddd-theme-default-slateLight);
      }

      @media (max-width: 768px) {
        :host {
          padding: 0 var(--ddd-spacing-4);
        }
        .slides {
          height: 320px;
        }
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
          (_, i) => html`
            <play-list-dot .index=${i} .active=${i === this.index}></play-list-dot>
          `
        )}
      </div>
    `;
  }

  _handleSlotChange(e) {
    const assigned = e.target.assignedElements({ flatten: true });

    // count only <play-list-slide> tags
    const slides = assigned.filter(
      (el) => el.tagName?.toLowerCase() === "play-list-slide"
    );
    this._slideCount = slides.length;

    // keep index valid
    if (this._slideCount > 0 && this.index > this._slideCount - 1) {
      this.index = this._slideCount - 1;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("arrow-click", (e) => {
      if (this._slideCount === 0) return;

      if (e.detail.direction === "left") {
        this.index = this.index === 0 ? this._slideCount - 1 : this.index - 1;
      } else {
        this.index = this.index === this._slideCount - 1 ? 0 : this.index + 1;
      }
    });

    this.addEventListener("dot-click", (e) => {
      this.index = e.detail.index;
    });
  }
}

/* Register all 4 elements */
customElements.define(PlayListSlide.tag, PlayListSlide);
customElements.define(PlayListArrow.tag, PlayListArrow);
customElements.define(PlayListDot.tag, PlayListDot);
customElements.define(PlayListProject.tag, PlayListProject);