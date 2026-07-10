/**
 * SITE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────
 * Edit this file to update personal info and the profile image
 * across the entire site at once.
 *
 * To replace the profile photo:
 *   1. Drop your new image into /public/ with the same filename.
 *   2. If you use a different filename, update PROFILE_IMAGE below.
 *      That single change propagates everywhere automatically.
 * ─────────────────────────────────────────────────────────────────
 */

export const PROFILE_IMAGE = '/profile.jpg'

export const SITE_CONFIG = {
  // Personal Info
  name: 'Hamza Naeem',
  title: 'Cybersecurity Student & SOC Aspirant',
  email: 'hamzanaeem1230@gmail.com',
  location: 'Pakistan',
  university: 'University of the Punjab',
  degree: 'BS Information Technology · 5th Semester',
  semester: '5th Semester',

  // Social & Professional Links
  github: 'https://github.com/hamzanaeem1230',
  githubUsername: 'hamzanaeem1230',
  linkedin: 'https://linkedin.com/in/hamza-naeem-652b48315',
  tryhackme: 'https://tryhackme.com/p/hamzanaeem1230',
  
  // Resume
  resumePath: '/resume.pdf',
  
  // Portfolio Description
  shortBio: 'Passionate Cybersecurity student focused on Blue Team Operations, SOC Analysis, Network Security, and AI Security.',
  longBio: 'I am a BS Information Technology student at the University of the Punjab with a genuine passion for cybersecurity, networking, and the intersection of AI and security. Focused on Blue Team operations, defensive security, and AI security research.',
  
  // Focus Areas
  focus: ['Blue Team', 'SOC Operations', 'AI Security', 'Network Security'],
  
  // Career Goals
  careerGoal: 'Become a SOC Analyst and specialize in AI Security research',
  
  // GitHub Stats (can be updated or fetched dynamically)
  stats: {
    repositories: '16+',
    projects: '6',
    certifications: '3',
  },
} as const
