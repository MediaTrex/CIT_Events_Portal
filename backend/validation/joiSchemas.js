// backend/validation/joiSchemas.js
// Centralized Joi validation schemas for various request payloads

import Joi from 'joi';

export const authSchemas = {
  // Example: login payload
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  // Example: registration payload (admin creates user)
  registerUser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('student', 'organizer', 'admin').required(),
  }),
};

export const eventSchemas = {
  create: Joi.object({
    title: Joi.string().max(255).required(),
    slug: Joi.string().max(255).required(),
    description: Joi.string().allow('').optional(),
    category_id: Joi.number().integer().optional(),
    organizer_id: Joi.number().integer().required(),
    venue: Joi.string().allow('').optional(),
    is_online: Joi.boolean().default(false),
    start_date: Joi.date().required(),
    end_date: Joi.date().greater(Joi.ref('start_date')).required(),
    registration_deadline: Joi.date().less(Joi.ref('start_date')).required(),
    max_team_size: Joi.number().integer().min(1).default(1),
    min_team_size: Joi.number().integer().min(1).default(1),
    is_paid: Joi.boolean().default(false),
    price_cents: Joi.when('is_paid', {
      is: true,
      then: Joi.number().integer().min(0).required(),
      otherwise: Joi.optional(),
    }),
    prize_pool: Joi.string().allow('').optional(),
    status: Joi.string().valid('draft', 'published', 'closed', 'cancelled').default('draft'),
  }),
  update: Joi.object({
    title: Joi.string().max(255).optional(),
    description: Joi.string().allow('').optional(),
    category_id: Joi.number().integer().optional(),
    venue: Joi.string().allow('').optional(),
    is_online: Joi.boolean().optional(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().greater(Joi.ref('start_date')).optional(),
    registration_deadline: Joi.date().less(Joi.ref('start_date')).optional(),
    max_team_size: Joi.number().integer().min(1).optional(),
    min_team_size: Joi.number().integer().min(1).optional(),
    is_paid: Joi.boolean().optional(),
    price_cents: Joi.when('is_paid', {
      is: true,
      then: Joi.number().integer().min(0).optional(),
      otherwise: Joi.optional(),
    }),
    prize_pool: Joi.string().allow('').optional(),
    status: Joi.string().valid('draft', 'published', 'closed', 'cancelled').optional(),
  }),
};

export const teamSchemas = {
  create: Joi.object({
    event_id: Joi.number().integer().required(),
    name: Joi.string().max(255).required(),
    captain_student_id: Joi.number().integer().optional(),
  }),
  addMember: Joi.object({
    student_id: Joi.number().integer().required(),
  }),
};

export const registrationSchemas = {
  createIndividual: Joi.object({
    event_id: Joi.number().integer().required(),
    student_id: Joi.number().integer().required(),
  }),
  createTeam: Joi.object({
    event_id: Joi.number().integer().required(),
    team_id: Joi.number().integer().required(),
  }),
};

export const paymentSchemas = {
  create: Joi.object({
    registration_id: Joi.number().integer().required(),
    amount_cents: Joi.number().integer().min(0).required(),
    currency: Joi.string().max(10).required(),
    provider: Joi.string().valid('stripe', 'paypal', 'razorpay', 'other').required(),
    provider_transaction_id: Joi.string().required(),
  }),
};

export const userSchemas = {
  create: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('student', 'organizer', 'admin').required(),
  }),
  update: Joi.object({
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    role: Joi.string().valid('student', 'organizer', 'admin').optional(),
  }),
};
