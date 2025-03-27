# 1. Generate a New SSH Key Pair
1.ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  ssh-keygen -t rsa -b 4096 -C "amanfrontdev@gmail.com"

This command will generate in C Drive:
Private key: ~/.ssh/id_rsa
Public key: ~/.ssh/id_rsa.pub

# 2. In GitHub > settings > secret & variables > actions
2. Go to .ssh > authorized_keys                 - paste this key inside  authorized_keys
 \ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCgVaVr6F+lBqIrFQLfeEqZzSTXGwj95p6NmFjeN+5xwqUi5b3j9IyEsfkN0M26Kyd8m4CwlTJv+UMBUhS3jRmFoy1P5qOXEZ6dhYn8ohlZMkaISRmNTnmzD+rGGkcFWavX1LhVKaqVYHKxe6cvVJ/ifzTWQqgAWMHGJ6S1C4/xgMCM1cmjOtqjjP05I0RTegkyiSe/yQ7gyErd68Z/Evdb3gy+KdYwkjUYCjPuILRCy8FzvhmtYlvEJm0hZ+AVAZfNTxFyFJWMH7FeCeU9Y+KDTxtFgJk4gI+jyo5v3C58D5ZDDKbP5BLATJqP8jLABKXC3kS9UK0l7sNel5JlpjzlTvJtzmcPaGOl3wKqXbrnGjAbti0bu+gwCPWiEqJIkti1At8AAPL15WBwpv76y7pC8QR8hPNr0NKR6iejF8H0I1a0n5iItabdCQbPDRSs3MkPcUsnBWAyDf5GP3nnM13fQede30/B5PLb90UGLZ6MXisTRR9gNGTBb0qVkvzUPpMU49ig89J9OgA7C3XcE6aZFJ+vN5X6qmTk+Mr511rTkGbKkJjpT63Fz/F3wwojjw9PvUHBBScV+DfzwZtfPjRpBPWo6N8YTjEKwRkYLUQ3hS80u8OZaBriQaU+SvgbISB+Xe408tp6kwFhH5m3HlEFjxHnOVJDkfYwwvf6AwLElQ== ubuntu@ip-10-0-0-135

# 3. Now go to .ssh> authorize_key  
and paste it here ""id_rsa.pub"" file