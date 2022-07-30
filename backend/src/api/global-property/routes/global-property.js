'use strict';

/**
 * global-property router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::global-property.global-property');
