TASK 3: Terraform Infrastructure
Infrastructure Components (What & Why)

VPC (Virtual Private Cloud)
- I chose to build a private network for the shopping cart API using a VPC.
This provides complete control over networking and security while maintaining the application's isolation from other systems.

Public Subnet
- The public subnet is used for internet-facing components such as a Load Balancer. Direct internet access is only required for this part of the system.

Private Subnet
- The private subnet is being used to operate the shopping cart API containers. This protects the application by restricting direct access from the internet.

ECS Fargate 
- I chose ECS Fargate to run the application because it allows running containers without managing servers.
This is simpler than EC2 and suitable for small backend services like this API.

Security Group
A security group is used as a firewall to control traffic to the application.
Only required ports are opened to reduce security risks.

Security Decisions 
1. The public subnet is limited to internet-facing components only.
2. The application runs in a private subnet, so it cannot be accessed directly from the internet.
3. Port 3000 is only open inside the VPC because the API should not be publicly exposed.
4. Outbound traffic is allowed so the application can access external services if needed (for example, future integrations).

These decisions follow the principle of least privilege, meaning only necessary access is allowed.

Architecture Diagram (Traffic Flow)

Internet
↓
Load Balancer (Public Subnet)
↓
Shopping Cart API (ECS Fargate - Private Subnet)
↓
In-Memory Storage
