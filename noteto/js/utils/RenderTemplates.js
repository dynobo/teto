import DomUtils from './DomUtils.js';
import Options from './Options.js';
import BlockTypes from '../blocks.js';

const RenderTemplates = {
  loadTemplate(data, svg, grid) {
    // Remove existing blocks
    DomUtils.removeElements(svg.querySelectorAll('.dragit'));
    const blocks = {};

    // Load options
    const globalOptions = new Options(data.globalOptions);

    // Load Blocks
    Object.values(data.blocks).forEach((blockData) => {
      try {
        const newBlock = new BlockTypes[blockData.type](grid);
        newBlock.width = blockData.width;
        newBlock.height = blockData.height;
        newBlock.x = blockData.x;
        newBlock.y = blockData.y;
        newBlock.dataX = blockData.dataX;
        newBlock.dataY = blockData.dataY;
        newBlock.opts = new Options(blockData.opts);
        newBlock.opts.inherit(globalOptions);
        newBlock.root.style.webkitTransform = `translate(${newBlock.dataX}px,${newBlock.dataY}px)`;
        newBlock.root.style.transform = `translate(${newBlock.dataX}px,${newBlock.dataY}px)`;
        newBlock.addTo(svg);
        blocks[newBlock.id] = newBlock;
      } catch (error) {
        console.error(`Error loading block ${blockData.id} of type ${blockData.type}. Skipping.`);
        console.error(error);
      }
    });

    return [blocks, globalOptions];
  },
};

export default RenderTemplates;
