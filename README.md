# The Ship Quest

## Game Rules-Physics

- Fuel Usage:
  - Fly: -2
  - Dash: -20

- If not flying:
  - If Player in air && Height is between 150 - 250:
    - Player: Fly Sprite
    - Fuel: +0.2
  - If Player in air && Height is below 150:
    - Player: Fly Sprite
    - Fuel: +0.25
  - If Player on Ground:
    - BG: Stop
    - Enemy: 0.8 x speed
    - Player: Rest Sprite
    - Fuel: +0.25
