## API METHODS

<p align="center">
  <img src="api-methods.png" alt="Description of image">
</p>

HTTP methods, also known as HTTP verbs, are a set of standardized actions that dictate how clients and servers interact with each other over the Hypertext Transfer Protocol (HTTP). They define the type of operation that a client wants to perform on a resource located on a server. Each HTTP method carries a specific meaning and purpose, contributing to the overall functionality and behavior of web applications and APIs

#### Start Server (YARN)
```
-> yarn

-> yarn start
```

#### Start Server (NPM)
```
-> npm install

-> npm run start
```

#### Create .env file
```
-> cp env-example .env
```

#### Define variables

Example

```
PORT=3000
API_URL=http://localhost:3000
```

Here's a description of some commonly used HTTP methods:
 
* **GET**: The GET method is used to retrieve data from a specified resource on the server. It is primarily intended for read-only operations, where the client requests information without causing any modification to the server's state. GET requests are idempotent, meaning multiple identical requests produce the same result as a single request.

* **POST**: POST is employed to submit data to be processed to a specified resource on the server. It is commonly used for creating new resources or executing operations that result in changes to the server's state. Unlike GET requests, POST requests are not idempotent; sending the same request.

* **PUT**: PUT is utilized to update a specified resource on the server with the provided data. It replaces the entire representation of the target resource with the new data sent by the client. PUT requests are idempotent, meaning that sending the same request multiple times has the same effect as sending it once.

* **DELETE**: DELETE is employed to remove a specified resource from the server. It instructs the server to delete the resource identified by the request URL. Similar to PUT requests, DELETE requests are idempotent.

But there are other methods that can be used, these are:

* **PATCH**: The PATCH method is used to apply partial modifications to a resource. It's typically used when you want to apply only a part of the modifications supported by PUT.

* **OPTIONS**: This method is used to describe the communication options for the target resource. It allows the client to determine the communication options available for a particular resource or the server as a whole.

* **HEAD**: Similar to GET, but it only requests the headers of the resource without the body. It's often used to check for the existence of a resource or to retrieve metadata about it.

* **TRACE**: TRACE allows a client to see what changes or additions have been made to a resource during its traversal across the network to the server.

* **PROPFIND**: PROPFIND is used to retrieve properties, such as metadata, of a specified resource.

* **PROPPATCH**: PROPPATCH is used to update or set properties of a specified resource.

* **MKCOL**: MKCOL is used to create a new collection (e.g., a directory) at the specified URL.

* **COPY**: COPY is used to copy a resource from one location to another.

* **MOVE**: MOVE is used to move a resource from one location to another.

* **LOCK**: LOCK is used to lock a resource, typically to prevent other users from modifying it.

* **UNLOCK**: UNLOCK is used to unlock a previously locked resource.

* **MKACTIVITY**: MKACTIVITY is used to create a new activity within a version-controlled resource.

* **CHECKOUT**: CHECKOUT is used to create a working copy of a version-controlled resource.

* **MERGE**: MERGE is used to apply changes from one branch to another in a version-controlled resource.

* **NOTIFY**: NOTIFY is used in the context of Web Push to request updates from a server.

* **LINK**: LINK is used to establish one or more links between resources.

* **UNLINK**: UNLINK is used to remove one or more links between resources.
