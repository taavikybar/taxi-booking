## Taxi booking system

### Taxi booking system written in Node.js using TypeScript and Express server

Install node modules

	npm install

Compile TypeScript files and start the application

	npm run start
	
---
	
API Endpoints:

* `http://localhost:8090/api/book`
	* POST only
	* accepts JSON data in the format:
		* `{ source: { x: x1, y: y1 }, destination: { x: x2, y: y2 }}`
	* books the nearest available car and returns response in the format:
		* `{ car_id: id, total_time: t }`
	* if no car is available, empty response is returned
* `http://localhost:8090/api/tick` - moves all booked cars by 1 distance unit and returns current cars positions
* `http://localhost:8090/api/reset` - resets all cars to (0, 0) and unbooks them and returns current cars positions
* `http://localhost:8090/api/status`- returns current cars positions without any modifications made
	
---
#### Tests

Run all tests

	npm run tests
	
Run Unit tests

	npm run test-unit
	
Run unit tests with watch mode
	
	npm run test-unit-watch
	
Run Python API tests (make sure API server is up and running)

	npm run test-api
	
---
#### Coverage

After first time Unit tests have run, coverage is collected and accessible from `/test/reports/jest/index.html`.

---

#### Linting
	
Run TSLint

	npm run lint

---
#### Development

Start watching TypeScript files for changes and compiling them automatically

	npm run watch
	
