<!-- 1. Virtual Private Cloud (VPC) -->
A VPC (Virtual Private Cloud) is a logically isolated section of the AWS cloud where you can launch AWS resources in a private, secure, and customizable network.

<!-- Key Features of VPC: -->
Allows control over IP address ranges.
Supports both public and private subnets.
Can connect to the internet, on-premises networks, or other VPCs.
Provides security through Security Groups (SGs) and Network ACLs (NACLs).

<!-- Default vs Custom VPC -->
Default VPC: AWS provides one per region with pre-configured settings.
Custom VPC: You create and configure your own network settings, subnets, and gateways.

<!-- 2. Subnets -->
A subnet (sub-network) is a segment within a VPC that divides the network into smaller, manageable parts.

<!-- Types of Subnets: -->
Public Subnet – Has access to the internet via an Internet Gateway (IGW).
Private Subnet – No direct internet access, used for secure workloads like databases.
Isolated Subnet – No access to the internet, even via a NAT gateway.

<!-- CIDR Block in Subnets -->
Each subnet is assigned an IP range (CIDR block) within the VPC.

Example:

VPC CIDR: 10.0.0.0/16
Subnet CIDR: 10.0.1.0/24 (public subnet), 10.0.2.0/24 (private subnet)

<!-- Subnet Routing -->
Public subnets route traffic to an Internet Gateway.
Private subnets route outbound traffic through a NAT Gateway.

<!-- 3. Internet Gateway (IGW) -->
An Internet Gateway (IGW) is a component that allows resources in a public subnet to access the internet and accept inbound connections.

<!-- How IGW Works: -->
Attach IGW to the VPC.
Associate the IGW with a public route table.
Configure EC2 instances in public subnets with a public IP or Elastic IP.
<!-- Key Points: -->
Public subnets must have a route to the Internet Gateway (IGW).
Only public IP-enabled instances can communicate with the internet.

<!-- 4. Route Tables -->
A Route Table defines the paths that network traffic takes within a VPC.

<!-- How Routing Works: -->
Each subnet in a VPC is associated with a route table.
Routes are defined as destination → target.

Example of a public route table:
nginx

Destination       Target
10.0.0.0/16      local (VPC internal traffic)
0.0.0.0/0        igw-12345678 (Internet Gateway)

Example of a private route table:
nginx

Destination       Target
10.0.0.0/16      local
0.0.0.0/0        nat-12345678 (NAT Gateway)

<!-- Types of Route Tables: -->
Main Route Table – The default route table for all subnets unless explicitly changed.
Custom Route Table – Manually created to route traffic based on specific needs.

<!-- 5. Main Route Table -->
The Main Route Table is the default routing table for a VPC and applies to all subnets unless a custom route table is assigned.

<!-- Characteristics: -->
Automatically created when a VPC is created.
Controls the default routing for the entire VPC.
Can be modified but cannot be deleted.
If no specific route table is assigned to a subnet, it uses the main route table.

<!-- Example Default Route Table in AWS VPC: -->
sql

Destination       Target
10.0.0.0/16      local (All subnets can communicate internally)

This means all subnets within 10.0.0.0/16 can talk to each other.

<!-- Summary of AWS VPC Components -->
Component	            Function
VPC      	            A private, isolated network in AWS where you deploy resources.
Subnets	                Logical subdivisions of a VPC, can be public or private.
Internet Gateway (IGW)	Enables public subnet internet access.
Route Table	            Defines paths for network traffic within the VPC.
Main Route Table	    The default route table for all subnets unless changed.

<!-- 5(b). Network Access Control List (NACL) -->
A Network ACL (NACL) is a firewall at the subnet level that controls inbound and outbound traffic.

<!-- Key Features of NACLs: -->
Works at the subnet level, not individual instances.
Stateless: Outbound rules must explicitly allow return traffic.
Rules are evaluated in order, starting from lowest-numbered rule.
Each VPC has a default NACL that allows all inbound and outbound traffic.
Custom NACLs deny all traffic by default until rules are added.

Example NACL Rules:
Rule #	Protocol	Port Range	Source/Destination	Action
100	TCP	80	0.0.0.0/0	ALLOW
200	TCP	443	0.0.0.0/0	ALLOW
300	ALL	ALL	0.0.0.0/0	DENY
🚀 Use Case: Use NACLs to block malicious IPs or allow traffic only from trusted sources.

<!-- 6. Amazon EC2 (Elastic Compute Cloud) -->
Amazon EC2 provides virtual servers (instances) in AWS for running applications.

<!-- Key EC2 Concepts: -->
Instance Types: General-purpose, Compute-optimized, Memory-optimized, etc.
AMI (Amazon Machine Image): Pre-configured OS + Software.
Elastic IP: Static public IP for EC2 instances.
Instance Metadata: Used to retrieve details like instance ID, region, etc.
🚀 Use Case: Deploy applications, web servers, databases, and microservices on EC2.

<!-- 7. EC2 Security Group -->
A Security Group (SG) is a firewall that controls inbound and outbound traffic for EC2 instances.

<!-- Key Features: -->
Works at the instance level (not subnet level like NACL).
Stateful: If inbound traffic is allowed, the response is automatically allowed.
Default deny: No traffic is allowed unless explicitly permitted.

<!-- Example Security Group Rules: -->
Type	Protocol	Port Range	Source	Action
SSH	TCP	22	Your IP	ALLOW
HTTP	TCP	80	0.0.0.0/0	ALLOW
HTTPS	TCP	443	0.0.0.0/0	ALLOW
🚀 Use Case: Allow only required traffic to EC2 instances to enhance security.

<!-- 8. Amazon RDS (Relational Database Service) -->
AWS RDS is a managed database service for relational databases like MySQL, PostgreSQL, and SQL Server.

<!-- Key Features: -->
Supports multi-AZ for high availability.
Automated backups and point-in-time recovery.
Read replicas for performance optimization.
Encryption at rest using AWS KMS.
🚀 Use Case: Use RDS for scalable, managed databases instead of maintaining your own database server.

<!-- 9. RDS Security Group -->
The RDS security group controls which instances/services can connect to the database.

<!-- Example RDS Security Group Rules: -->
Type	Protocol	Port	Source	Action
MySQL/Aurora	TCP	3306	EC2 Security Group	ALLOW
PostgreSQL	TCP	5432	Lambda Function	ALLOW
🚀 Use Case: Only allow connections from application servers instead of exposing the database to the public internet.

<!-- 10. NAT Gateway -->
A NAT (Network Address Translation) Gateway allows private subnet instances to access the internet without being publicly exposed.

<!-- Key Features: -->
Outbound internet access for private instances.
Managed service (no need to configure NAT instances).
Scales automatically based on traffic.

<!-- NAT vs IGW: -->
Feature	Internet Gateway (IGW)	NAT Gateway
Public or Private	Public subnet	Private subnet
Inbound Traffic	Allowed	Not Allowed
Outbound Traffic	Allowed	Allowed
🚀 Use Case: Allow private instances (e.g., databases) to download updates without exposing them to the public internet.

<!-- 11. AWS Amplify -->
AWS Amplify is a development platform for frontend applications, providing hosting, authentication, and backend APIs.

<!-- Key Features: -->
Static website hosting (React, Next.js, Vue, Angular).
Serverless backend with AWS AppSync and GraphQL.
Authentication using Cognito.
CI/CD integration for automatic deployments.
🚀 Use Case: Deploy React/Next.js apps with authentication and APIs.

<!-- 12. API Gateway -->
AWS API Gateway is a fully managed service for creating, deploying, and managing REST and WebSocket APIs.

<!-- Key Features: -->
Supports REST, HTTP, and WebSocket APIs.
Integrates with Lambda, EC2, RDS, DynamoDB.
Rate limiting and API keys for security.
Supports JWT and IAM-based authentication.
🚀 Use Case: Use API Gateway as an entry point for microservices.

<!-- 13. Amazon S3 (Simple Storage Service) -->
Amazon S3 is an object storage service that provides scalable, durable storage.

<!-- Key Features: -->
Stores any type of data (images, videos, logs, backups).
Access Control via IAM policies and S3 Bucket Policies.
Versioning and lifecycle rules for cost optimization.
S3 Transfer Acceleration for faster uploads.
🚀 Use Case: Store website assets, backups, logs, and media files.

<!-- 14. AWS Authentication (Auth) -->
AWS provides multiple authentication methods:

<!-- 1. AWS Cognito (Recommended) -->
User authentication and identity management.
Supports OAuth, OpenID, SAML.
MFA (Multi-Factor Authentication) enabled.
Integrates with Amplify and API Gateway.

<!-- 2. IAM (Identity and Access Management) -->
Controls access to AWS services.
Uses IAM policies, roles, and groups.
Supports role-based access control (RBAC).

<!-- 3. API Gateway Authentication -->
IAM Authentication: Uses AWS IAM roles.
JWT Tokens: Uses Cognito User Pools.
API Keys: Simple authentication for public APIs.
🚀 Use Case: Use Cognito for user authentication and IAM for service permissions.


