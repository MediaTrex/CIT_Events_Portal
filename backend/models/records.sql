-- Create the database 
CREATE DATABASE IF NOT EXISTS events;

-- Use database
USE events;

-- users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    college VARCHAR(255),
    dob DATE,

    user_type ENUM('CITian', 'External') NOT NULL,
    external_types VARCHAR(255),

    role ENUM('admin', 'organizer', 'participant') NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    resetOtp VARCHAR(6),
    resetOtpExpiryAt TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (
        (role = 'admin' AND dob IS NULL AND college IS NULL)
        OR
        (role = 'organizer' AND dob IS NULL AND college IS NULL)
        OR
        (role = 'participant' AND dob IS NOT NULL AND college IS NOT NULL)
    )

    CHECK (
        (user_type = 'External' AND external_types IS NOT NULL)
        OR
        (user_type = 'CITian' AND external_types IS NULL)
    )
);

-- events table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    event_venue VARCHAR(255) NOT NULL,
    event_type ENUM('paid', 'free') NOT NULL,
    amount DECIMAL(10,2) DEFAULT 0,
    reg_start_date DATE NOT NULL,
    reg_deadline DATE NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    organizer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE SET NULL,

    CHECK (
        (event_type = 'paid' AND amount > 0)
        OR
        (event_type = 'free' AND amount = 0)
    )
);

-- team table 
CREATE TABLE teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL,
    created_by INT NOT NULL,   -- captain
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- team_members table
CREATE TABLE team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('captain', 'member') DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (team_id, user_id),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- event_registrations table
CREATE TABLE event_registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    team_id INT NULL,
    user_id INT NULL,
    registered_by INT NOT NULL,
    registration_type ENUM('individual', 'team') NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (registered_by) REFERENCES users(id) ON DELETE CASCADE,
    CHECK (
        (registration_type = 'individual' AND user_id IS NOT NULL AND team_id IS NULL)
        OR
        (registration_type = 'team' AND team_id IS NOT NULL AND user_id IS NULL)
    )
);

-- payments table
-- CREATE TABLE payments (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     registration_id INT NOT NULL,
--     amount DECIMAL(10,2) NOT NULL,
--     payment_method VARCHAR(50),
--     transaction_id VARCHAR(255),
--     status ENUM('initiated', 'success', 'failed') DEFAULT 'initiated',
--     paid_at TIMESTAMP,
--     FOREIGN KEY (registration_id) REFERENCES event_registrations(id) ON DELETE CASCADE
-- );