# API Documentation

## Widget

| Request Type | Base URL    | API Endpoint        | Access | Description                                      |
|--------------|-------------|---------------------|--------|--------------------------------------------------|
| GET          | /api/v3/app | /events?id=:event_id | Public | Get an event by ID                               |
| GET          | /api/v3/app | /events?type=latest&limit=5&page=1 | Public | Get the latest events                            |
| POST         | /api/v3/app | /events             | Public | Create a new event with file upload               |
| PUT          | /api/v3/app | /events/:id         | Public | Update an event                                  |
| DELETE       | /api/v3/app | /events/:id         | Public | Delete an event                                  |
| GET          | /api/v3/app | /getfile/:filename  | Public | Get an image/file                                |

### Endpoint 1: Get an Event by ID

**Endpoint:** GET /api/v3/app/events?id=:event_id  
**Access:** Public  
**Description:** Retrieve details about a specific event by its ID.  
**Path Parameters:**
- `event_id` (string): The unique identifier of the event.  
**Response:**
- 200 OK: Returns the event data in JSON format.
- 404 Not Found: The specified event was not found.

### Endpoint 2: Get Latest Events

**Endpoint:** GET /api/v3/app/events?type=latest&limit=5&page=1  
**Access:** Public  
**Description:** Retrieve a list of the latest events.  
**Query Parameters:**
- `type` (string): The type of events to retrieve (e.g., "latest").
- `limit` (number): The maximum number of events to retrieve per page.
- `page` (number): The page number of the events to retrieve.  
**Response:**
- 200 OK: Returns the latest events in JSON format.

### Endpoint 3: Create an Event with File Upload

**Endpoint:** POST /api/v3/app/events  
**Access:** Public  
**Description:** Create a new event with support for file upload.  
**Request Body Parameters:**
- `type` (string): The type of the event.
- `name` (string): The name of the event.
- `tagline` (string): The tagline of the event.
- `schedule` (string): The schedule of the event.
- `description` (string): The description of the event.
- `moderator` (string): The moderator of the event.
- `category` (string): The category of the event.
- `sub_category` (string): The sub-category of the event.
- `rigor_rank` (string): The rank of the event's rigor.
- `attendees` (string): The attendees of the event.
- `file` (file): The image/file to be uploaded.  
**Response:**
- 200 OK: Returns the newly created event data in JSON format.
- 400 Bad Request: Invalid request parameters or an error occurred while creating the event.

#### Endpoint 4: Update an Event

- **Endpoint**: `PUT /api/v3/app/events/:id`
- **Access**: Public
- **Description**: Update an existing event by its ID.
- **Path Parameters**:
  - `id` (string): The unique identifier of the event.
- **Request Body Parameters**:
  - `type` (string): The updated type of the event.
  - `name` (string): The updated name of the event.
  - `tagline` (string): The updated tagline of the event.
  - `schedule` (string): The updated schedule of the event.
  - `description` (string): The updated description of the event.
  - `moderator` (string): The updated moderator of the event.
  - `category` (string): The updated category of the event.
  - `sub_category` (string): The updated sub-category of the event.
  - `rigor_rank` (string): The updated rank of the event's rigor.
  - `attendees` (string): The updated attendees of the event.
  - `files` (file): The updated image/file to be uploaded.
- **Response**:
  - 200 OK: Returns the updated event data in JSON format.
  - 400 Bad Request: Invalid request parameters or an error occurred while updating the event.
  - 404 Not Found: The specified event was not found.

#### Endpoint 5: Delete an Event

- **Endpoint**: `DELETE /api/v3/app/events/:id`
- **Access**: Public
- **Description**: Delete an existing event by its ID.
- **Path Parameters**:
  - `id` (string): The unique identifier of the event.
- **Response**:
  - 200 OK: Returns a success message indicating that the event was deleted.
  - 400 Bad Request: Invalid request parameters or an error occurred while deleting the event.
  - 404 Not Found: The specified event was not found.

#### Endpoint 6: Get Image/File

- **Endpoint**: `GET /api/v3/app/getfile/:filename`
- **Access**: Public
- **Description**: Retrieve an image/file by its filename.
- **Path Parameters**:
  - `filename` (string): The filename of the image/file to retrieve.
- **Response**:
  - 200 OK: Returns the image/file data.
  - 400 Bad Request: Invalid request or an error occurred while retrieving the image/file.