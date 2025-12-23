# Use official Moodle PHP-Apache base image
FROM moodlehq/moodle-php-apache:8.3

# Set maintainer label
LABEL maintainer="Sabin Thapa <thapasabin8@gmail.com>"

# Install system dependencies for Composer (curl, git, etc.)
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer --version

COPY composer.json /var/www/html/
COPY composer.lock /var/www/html/
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress

COPY . /var/www/html

# Set working directory to Moodle root
WORKDIR /var/www/html

# Expose Apache port
EXPOSE 80

# Default command: Start Apache (can override for Composer runs)
CMD ["apache2-foreground"]
