# Solar system
## Javascript project proposal by Maurice Spiewack, App Academy NYC Oct 2016

The solar system app shows a 3d representation of the solar system, showing the major celestial bodies and their respective positions and orbits relative to the sun. The user can explore the various planets, accessing astronomical data and photos.

While the app will be faithful to scientific data, the orbits and positions will only be calculated using approximate models. Specifically, the gravitational influence exerted and experienced by the celestial bodies will not be calculated. For the purposes of this app, a less complex simulation will suffice.

Imagery is available in the public domain through NASA and other space research agencies.

### Functionality and MVP

- View a 3d representation of the solar system, showing the major celestial bodies and their respective positions and orbits
- Zoom in on individual celestial bodies to show a description with additional data, such as composition and size, as well as any detailed pictures available.
- Calculate the respective positions for any given date

### Stretch Goals

- Include interactive displays of significant events in space exploration, p.e. the Apollo 11 moon mission with the respective trajectories of the spacecraft involved. Other possible examples are the Verena missions to Venus, the Voyager deep space probes, and the Chicxulub impact event, which caused the extinction of the dinosaurs.

### Architecture and technologies

- Javascript and jQuery for the basic app logic
- [three.js](https://threejs.org) for 3d graphics
- [Node-astronomy](https://github.com/TimeMagazine/node-astronomy) to provide mathematical models for orbital mechanics

The 3d scene will contain the following components:
- Skysphere to display (static) background image of the Milky Way and the stars
- Spheres for the major celestial objects of the solar system:
  - Sun
  - Mercury
  - Venus
  - Earth & Moon
  - Mars
  - Jupiter & Rings
  - Saturn & Rings
  - Uranus & Rings
  - Neptune
  - Pluto
- Lines representing the orbits of the individual planets

### Implementation timeline
#### Day 1
- Create basic 3d scene in three.js. Include skysphere, all celestial bodies, as well as the orbits.
- Apply textures to 3d objects, taking care to fix any potential render artifacts due to spherical distortion
- Create camera interaction, moving the camera to any selected object

#### Day 2
- Create text components displaying planet information
- Create input components allowing user navigation
- Create responsive design, showing the 3d viewport as well as the text

#### Day 3
- Fill text components with as much detail as available, including more pictures where available
- Add an 'About' page with additional project information as well as links to my personal and portfolio sites
- Finalize production readme
- Add some special atmospheric effects to the Sun, Earth, and the Gas Giants as time permits
- Work on stretch goals as time permits
