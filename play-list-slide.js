/**
 * Copyright 2026 jtarchb
 * @license Apache-2.0
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class PlayListSlide extends DDDSuper(LitElement) {
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
        font-family: var(--ddd-font-primary);
        font-size: var(--ddd-font-size-sm);
        font-weight: var(--ddd-font-weight-bold);
        text-transform: uppercase;
        letter-spacing: '--ddd-ls-72-lg';
        color: var(--ddd-theme-default-beaverBlue);
        margin-bottom: var(--ddd-spacing-2);
      }

      .second {
        font-family: var(--ddd-font-primary);
        font-size: var(--ddd-font-size-4xl);
        font-weight: var(--ddd-font-weight-bold);
        margin-bottom: var(--ddd-spacing-4);
      }

      .rule {
        width: 90px;
        height: 4px;
        border-radius: '--ddd-radius-rounded' ;
        background: var(--ddd-theme-default-beaverBlue);
        margin-bottom: var(--ddd-spacing-4);
      }

      .content {
        flex: 1;
        overflow-y: auto;
        max-width: 700px;
        font-family: var(--ddd-font-primary);

      }
      
      .content::-webkit-scrollbar {
        width: 12px;
      }


      .content::-webkit-scrollbar-track {
        background: var(--ddd-theme-default-slateMaxLight);
      }


      .content::-webkit-scrollbar-thumb {
        background-color: var(--ddd-theme-default-limestoneGray);
        border-radius: 20px;
        border: 3px solid var(--ddd-theme-default-slateMaxLight);
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

customElements.define(PlayListSlide.tag, PlayListSlide);