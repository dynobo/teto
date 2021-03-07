/**
 * Helper methods for calculation around drag/drop/resize grid
 */

const GridUtils = {
  /**
   * Calculate greatest common divisor of two numbers
   * @param {int} a first number
   * @param {int} b second number
   * @return {int} GCD
   */
  gcd(a, b) {
    if (!b) {
      return a;
    }
    return this.gcd(b, a % b);
  },

  /**
   * Calculate dimensions used for the SnapGrid.
   * @param {*} root
   * @return {dict} SnapGrid consisting of width (x), height (y) and offset
   */
  calcGrid(root) {
    // Get GCD for calculating grid size.
    const page = {
      width: root.viewBox.baseVal.width,
      height: root.viewBox.baseVal.height,
    };
    const pageGcd = this.gcd(page.height, page.width);

    // Bounding Rect
    const rect = root.getBoundingClientRect();

    // Define grid dimensions using GCD to ensures a quadratic grid which fills
    // the whole page. Add offset of element.
    return {
      x: pageGcd / 5,
      y: pageGcd / 5,
      offset: { x: rect.left, y: rect.top },
    };
  },

};

export default GridUtils;