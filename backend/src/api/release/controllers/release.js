'use strict';

/**
 *  release controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::release.release');
