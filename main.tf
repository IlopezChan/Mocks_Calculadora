terraform {
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "~> 4.52.0"
    }
    random = {
      source = "hashicorp/random"
      version = "~> 3.1.0"
    }
    archive = {
      source = "hashicorp/archive"
      version = "~> 2.2.0"
    }
  }

  required_version = "~> 1.0"
}

provider "aws" {
  region = var.aws_region
}

# Crea el zip del código (en caso de pesar más de 10MB considera usar un bucket)
data "archive_file" "template_nest" {
  type = "zip"
  source_dir = "${path.module}/dist"
  output_path = "${path.module}/dist.zip"
}

# Crea el zip de tus librerías
data "archive_file" "layer_nest" {
  type = "zip"

  source_dir = "${path.module}/node_modules"
  output_path = "${path.module}/node_modules.zip"
}

# Crea una capa en la que irán las librerías para ejecutar el código
resource "aws_lambda_layer_version" "layer_nest" {
  filename =  data.archive_file.layer_nest.output_path
  layer_name =  "capa-mock-calculadora"

  source_code_hash = data.archive_file.layer_nest.output_base64sha256 # No borrar, asegura que los cmabios en tus librerías se detecten

  compatible_runtimes = ["nodejs16.x"]
}

# Crea la funcion lambda 


resource "aws_lambda_function" "template_nest" {
  function_name = "lambda-mock-calculadora" 
  filename = data.archive_file.template_nest.output_path
  runtime = "nodejs16.x"
  handler = "lambda.handler" # indica el archivo en el que se encuentra el handler para activar la función
  timeout = 30 # Timeout
  source_code_hash = data.archive_file.template_nest.output_base64sha256 # No borrar, esto asegura que los cambios en tu codigo se detecten
  layers = ["arn:aws:lambda:us-east-1:248760527160:layer:layer_crud:3", aws_lambda_layer_version.layer_nest.arn] # Conecta las capas con tu función lambda
  role = "arn:aws:iam::248760527160:role/ecommerce-rol" # Indica el rol de ejecucion de la lambda
  environment {
    #Aquí puedes indicar las variables de entorno de la lambda
    variables = {
      "TZ" = "Mexico/general" # No borrar, le indica a la lambda la zona horaria
      NODE_PATH = "/opt" # No borrar, le indica a la lambda donde encontrar las librerías en la capa
    }
  }
}

# Crea la api de AppSync
resource "aws_appsync_graphql_api" "appsyncGraphQl" {
  name = "mocks-calculadora"
  schema = file("./graphql/schemas/schema.graphql") # Ruta a tu schema de graphql
  authentication_type = "AWS_LAMBDA" # Autenticación por cognito
  
  #Configuración de la auenticación por cognito
    lambda_authorizer_config {
        authorizer_uri = "arn:aws:lambda:us-east-1:248760527160:function:AuthorizerV3"
        authorizer_result_ttl_in_seconds = 0
    }
}

# Aqui puedes configurar tus origenes de datos y sus respectivos resolvers

# Creación de un origen de datos
resource "aws_appsync_datasource" "lambdaDS" {
  name = "mocks_calculadora" # Nombre del origen de datos
  api_id = aws_appsync_graphql_api.appsyncGraphQl.id # id de la api de appsync en la que vas a crear este origen
  service_role_arn = "arn:aws:iam::248760527160:role/appsync-test-lambda"
  type = "AWS_LAMBDA" # Tipo de origen
  lambda_config {
    function_arn = aws_lambda_function.template_nest.arn #En caso de ser lambda especifica el ARN de la función
  }

}

# Creación de un solucionador
resource "aws_appsync_resolver" "lambdaResolverValidar" {
  api_id = aws_appsync_graphql_api.appsyncGraphQl.id # id de la api de appsync
  type = "Query" # Tipo de accion graphql
  field = "validate" # Nombre de la consulta
  data_source = aws_appsync_datasource.lambdaDS.name # nombre del origne de datos al que se conectará el solucionador

  request_template = file("./graphql/resolvers/lambda/requestValidar.vtl") # Ruta a tu solicionador de la request
  response_template = file("./graphql/resolvers/lambda/response.vtl") # Ruta a tu solucionador de la response
}

resource "aws_appsync_resolver" "lambdaResolverConfiguracion" {
  api_id = aws_appsync_graphql_api.appsyncGraphQl.id # id de la api de appsync
  type = "Query" # Tipo de accion graphql
  field = "configuration" # Nombre de la consulta
  data_source = aws_appsync_datasource.lambdaDS.name # nombre del origne de datos al que se conectará el solucionador

  request_template = file("./graphql/resolvers/lambda/requestIncode.vtl") # Ruta a tu solicionador de la request
  response_template = file("./graphql/resolvers/lambda/response.vtl") # Ruta a tu solucionador de la response
}

# Creación de un solucionador
resource "aws_appsync_resolver" "lambdaResolverProceso" {
  api_id = aws_appsync_graphql_api.appsyncGraphQl.id # id de la api de appsync
  type = "Mutation" # Tipo de accion graphql
  field = "process" # Nombre de la consulta
  data_source = aws_appsync_datasource.lambdaDS.name # nombre del origne de datos al que se conectará el solucionador

  request_template = file("./graphql/resolvers/lambda/requestProceso.vtl") # Ruta a tu solicionador de la request
  response_template = file("./graphql/resolvers/lambda/response.vtl") # Ruta a tu solucionador de la response
}

# Creación de un solucionador
resource "aws_appsync_resolver" "lambdaResolverPhone" {
  api_id = aws_appsync_graphql_api.appsyncGraphQl.id # id de la api de appsync
  type = "Query" # Tipo de accion graphql
  field = "phone" # Nombre de la consulta
  data_source = aws_appsync_datasource.lambdaDS.name # nombre del origne de datos al que se conectará el solucionador

  request_template = file("./graphql/resolvers/lambda/requestPhone.vtl") # Ruta a tu solicionador de la request
  response_template = file("./graphql/resolvers/lambda/response.vtl") # Ruta a tu solucionador de la response
}


resource "aws_appsync_resolver" "journeyResolver" {
  api_id = aws_appsync_graphql_api.appsyncGraphQl.id
  type = "respValidar"
  field = "dataJourney"
  data_source = aws_appsync_datasource.lambdaDS.name

  request_template = file("./graphql/resolvers/lambda/request_journey.vtl")
  response_template = file("./graphql/resolvers/lambda/response.vtl")
}
