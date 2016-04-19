/**
 * Created by Northwalker on 2016/4/14.
 */
(function (window, angular, undefined) {
  'use strict';

  var urlBase = '/api';
  var authHeader = 'authorization';

  /**
   * @ngdoc overview
   * @name ngActivitiRestServices
   * @module
   * @description
   *
   * The `ngActivitiRestService` module provides services for interacting with
   * activiti engine REST API.
   *
   */
  var ngActivitiRest = angular.module('ngActivitiRestServices', ['ngResource']);
  ngActivitiRest
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('ngActivitiRequestInterceptor');
    }])
    .factory('ngActivitiRequestInterceptor', ['$q', 'ngActivitiResource',
      function ($q, ngActivitiResource) {
        return {
          'request': function (config) {
            var activitiAcct = ngActivitiResource.getActivitiAccount() ? ngActivitiResource.getActivitiAccount() : 'kermit';
            var activitiPwd = ngActivitiResource.getActivitiAccount() ? ngActivitiResource.getActivitiAccount() : 'kermit';
            config.headers[authHeader] = 'Basic ' + btoa(activitiAcct + ':' + activitiPwd);
            return config;
          }
        }
      }])
    /**
     * @ngdoc object
     * @name ngActivitiRestService.ngActivitiResourceProvider
     * @header ngActivitiRestService.ngActivitiResourceProvider
     * @description
     * Use `ngActivitiResourceProvider` to change the global configuration
     * settings used.
     *
     * ## Example
     *
     * ```js
     * angular.module('app')
     *  .config(function(ngActivitiResourceProvider) {
     *     ngActivitiResourceProvider.setAuthHeader('X-Access-Token');
     *  });
     * ```
     */
    .provider('ngActivitiResource', function ngActivitiResourceProvider() {

      /* */
      this.activitiAccount = 'kermit';     // Default account
      this.activitiPassword = 'kermit';     // Default password

      /**
       * @ngdoc method
       * @name ngActivitiRestServices.ngActivitiResourceProvider#setAuthHeader
       * @methodOf ngActivitiRestServices.ngActivitiResourceProvider
       * @param {string} header The header name to use, e.g. `X-Access-Token`
       * @description
       *
       */
      this.setAuthHeader = function (header) {
        authHeader = header;
      };

      /**
       * @ngdoc method
       * @name ngActivitiRestServices.ngActivitiResourceProvider#setUrlBase
       * @methodOf ngActivitiRestServices.ngActivitiResourceProvider
       * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
       * @description
       * Change the URL of the REST API server.
       *
       */
      this.setUrlBase = function (url) {
        urlBase = url;
      };

      /**
       * @ngdoc method
       * @name ngActivitiRestServices.ngActivitiResourceProvider#getUrlBase
       * @methodOf ngActivitiRestServices.ngActivitiResourceProvider
       * @description
       * Get the URL of the REST API server.
       *
       */
      this.getUrlBase = function () {
        return urlBase;
      };

      this.setActivitiAccount = function (account) {
        this.activitiAccount = account;
      };

      this.getActivitiAccount = function () {
        return this.activitiAccount;
      };

      this.setActivitiPassword = function (password) {
        this.activitiPassword = password;
      };

      this.getAcitivitiPassword = function () {
        return this.activitiPassword;
      };

      this.$get = ['$resource', function ($resource) {
        return this;
      }];
    })
    .factory('DeploymentService', ['$resource', function ($resource) {
      var R = $resource(
        urlBase + '/repository/deployments/:deploymentId',
        {'deploymentId': '@deploymentId'},
        {
          'listDeployments': {
            'method': 'GET',
            'url': urlBase + '/repository/deployments'
          },
          'getDeployment': {
            'method': 'GET',
            'url': urlBase + '/repository/deployments/:deploymentId'
          },
          'createNewDeployment': {
            'method': 'POST',
            'url': urlBase + '/repository/deployments'
          },
          'deleteDeployment': {
            'method': 'DELETE',
            'url': urlBase + '/repository/deployments/:deploymentId'
          },
          'listResourcesInDeployment': {
            'method': 'GET',
            'url': urlBase + '/repository/deployments/:deploymentId/resources'
          },
          'getDeploymentResources': {
            'method': 'GET',
            'param': {resourceId: '@resourceId'},
            'url': urlBase + '/repository/deployments/:deploymentId/resources/:resourceId'
          },
          'getDeploymentResourcesContent': {
            'method': 'GET',
            'param': {resourceId: '@resourceId'},
            'url': urlBase + '/repository/deployments/:deploymentId/resourcedata/:resourceId'
          }

        }
      );

      R["get"] = R["listDeployments"];
      R["getById"] = R["getDeployment"];
      R["post"] = R["createNewDeployment"];
      R["deleteById"] = R["deleteDeployment"];
      R["destroyById"] = R["deleteDeployment"];
      R["removeById"] = R["deleteDeployment"];

      return R;

    }])
    .factory('ProcessDefinitionsService', ['$resource', function ($resource) {
      var R = $resource(
        urlBase + "/repository/process-definitions/:processDefinitionId",
        {'processDefinitionId': '@processDefinitionId'},
        {
          "listProcessDefinitions": {
            'method': 'GET',
            'url': urlBase + '/repository/process-definitions'
          },
          "getProcessDefinitions": {
            'method': 'GET',
            'url': urlBase + '/repository/process-definitions/:processDefinitionId'
          },
          "UpdateCategoryForProcessDefinition": {
            'method': 'PUT',
            'url': urlBase + '/repository/process-definitions'
          },
          "GetProcessDefinitionResourceContent": {
            'method': 'GET',
            'url': urlBase + "/repository/process-definitions/:processDefinitionId/resourcedata"
          },
          "GetProcessDefinitionBPMNModel": {
            'method': 'GET',
            'url': urlBase + "/repository/process-definitions/:processDefinitionId/model"
          },
          "suspendProcessDefinition": {
            'method': 'PUT',
            'url': urlBase + "/repository/process-definitions/:processDefinitionId"
          },
          "activateProcessDefinition": {
            'method': 'PUT',
            'url': urlBase + "/repository/process-definitions/:processDefinitionId"
          },
          "getAllCandidateStartersForProcessDefinition": {
            'method': 'GET',
            'url': urlBase + "/repository/process-definitions/:processDefinitionId/identitylinks"
          },
          "addCandidateStartersToProcessDefinition": {
            'method': 'POST',
            'url': urlBase + "/repository/process-definitions/:processDefinitionId/identitylinks"
          },
          "deleteCandidateStartersFromProcessDefinition": {
            'method': 'DELETE',
            'url': urlBase + "/repository/process-definitions/:processDefinitionId/identitylinks"
          },
          "getCandidateStartersFromProcessDefinition": {
            'method': 'GET',
            'param': {family: '@family', identityId: '@identityId'},
            'url': urlBase + "/repository/process-definitions/:processDefinitionId/identitylinks/:family/:identityId"
          }

        }
      );

      R["destroyById"] = R["deleteById"];
      R["removeById"] = R["deleteById"];

      return R;

    }])
    .factory('ModelsService', ['$resource', function ($resource) {
      var R = $resource(
        urlBase + "/repository/models/:modelId",
        {'modelId': '@modelId'},
        {}
      );

      R["destroyById"] = R["deleteById"];
      R["removeById"] = R["deleteById"];

      return R;

    }])
    .factory('ProcessInstanceService', ['$resource', function ($resource) {
      var R = $resource(
        urlBase + "/repository/process-instances/:processInstanceId",
        {'processInstanceId': '@processInstanceId'},
        {
          'getProcessInstance': {
            'method': 'GET',
            'url': urlBase + 'runtime/process-instances/:processInstanceId'
          },
          'deleteProcessInstance': {
            'method': 'DELETE',
            'url': urlBase + 'runtime/process-instances/:processInstanceId'
          },
          'activateProcessInstance': {
            'method': 'PUT',
            'url': urlBase + 'runtime/process-instances/:processInstanceId'
          },
          'startProcessInstance': {
            'method': 'POST',
            'url': urlBase + 'runtime/process-instances/:processInstanceId'
          },
          'listProcessInstance': {
            'method': 'GET',
            'url': urlBase + 'runtime/process-instances'
          },
          'queryProcessInstance': {
            'method': 'POST',
            'url': urlBase + 'query/process-instances'
          },
          'getDiagramForProcessInstance': {
            'method': 'GET',
            'url': urlBase + 'runtime/process-instances/:processInstanceId/diagram'
          },
          'getInvolvedForProcessInstance': {
            'method': 'GET',
            'url': urlBase + 'runtime/process-instances/:processInstanceId/identitylinks'
          },
          'addInvolvedForProcessInstance': {
            'method': 'POST',
            'url': urlBase + 'runtime/process-instances/:processInstanceId/identitylinks'
          },
          'removeInvolvedForProcessInstance': {
            'method': 'DELETE',
            'param': {userId: '@userId', type: '@type'},
            'url': urlBase + 'runtime/process-instances/:processInstanceId/identitylinks/users/:userId/:type'
          },
          'listVariablesForProcessInstance': {
            'method': 'GET',
            'url': urlBase + 'runtime/process-instances/:processInstanceId/variables'
          },
          'getVariableForProcessInstance': {
            'method': 'GET',
            'param': {variableName: '@variableName'},
            'url': urlBase + 'runtime/process-instances/:processInstanceId/variables/:variableName'
          },
          'createVariablesForProcessInstance': {
            'method': 'POST',
            'url': urlBase + 'runtime/process-instances/:processInstanceId/variables'
          },
          'updateVariablesForProcessInstance': {
            'method': 'PUT',
            'url': urlBase + 'runtime/process-instances/:processInstanceId/variables'
          },
          'updateSingleVariableForProcessInstance': {
            'method': 'PUT',
            'param': {variableName: '@variableName'},
            'url': urlBase + 'runtime/process-instances/:processInstanceId/variables/:variableName'
          },
          'createBinaryVariablesOnProcessInstance': {
            'method': 'POST',
            'url': urlBase + 'runtime/process-instances/:processInstanceId/variables'
          },
          'updateBinaryVariablesOnProcessInstance': {
            'method': 'PUT',
            'url': urlBase + 'runtime/process-instances/:processInstanceId/variables'
          }
        }
      );

      return R;
    }])
    .factory('ExecutionsService', ['$resource', function ($resource) {
      var R = $resource(
        urlBase + "/repository/executions/:executionId",
        {'executionId': '@executionId'},
        {
          'getExecution': {
            'method': 'GET',
            'url': urlBase + 'runtime/executions/:executionId'
          },
          'executeExecution': {
            'method': 'PUT',
            'url': urlBase + 'runtime/executions/:executionId'
          },
          'getActivesInExecution': {
            'method': 'GET',
            'url': urlBase + 'runtime/executions/:executionId/activities'
          },
          'listExecutions': {
            'method': 'GET',
            'url': urlBase + 'runtime/executions'
          },
          'queryExecutions': {
            'method': 'POST',
            'url': urlBase + 'runtime/executions'
          },
          'listVariablesForExecutions': {
            'method': 'GET',
            'param': {scope: '@scope'},
            'url': urlBase + 'runtime/executions/:executionId/variables?scope=:scope'
          },
          'getVariablesForExecutions': {
            'method': 'GET',
            'param': {variableName: '@variableName', scope: '@scope'},
            'url': urlBase + 'runtime/executions/:executionId/:variableName?scope=:scope'
          },
          'createVariablesOnExecutions': {
            'method': 'POST',
            'url': urlBase + 'runtime/executions/:executionId/variables'
          },
          'updateVariablesOnExecutions': {
            'method': 'PUT',
            'url': urlBase + 'runtime/executions/:executionId/variables'
          },
          'updateVariableOnExecutions': {
            'method': 'PUT',
            'param': {variableName: '@variableName'},
            'url': urlBase + 'runtime/executions/:executionId/variables/:variableName'
          },
          'createBinaryVariablesOnExecutions': {
            'method': 'POST',
            'url': urlBase + 'runtime/executions/:executionId/variables'
          },
          'updateBinaryVariablesOnExecutions': {
            'method': 'PUt',
            'url': urlBase + 'runtime/executions/:executionId/variables'
          }
        }
      );

      return R;

    }])
    .factory('TaskService', ['$resource', function ($resource) {
      var R = $resource(
        urlBase + "/repository/tasks/:id",
        {'id': '@id'},
        {
          'query': {
            'method': 'POST',
            'url': urlBase + 'query/historic-process-instances/'
          },
          'getBinaryDataForHistoric': {
            'method': 'GET',
            'param': {variableName: '@variableName'},
            'url': urlBase + 'history/historic-process-instances/:processInstanceId/variables/:variableName/data'
          },
          'getHistoricTask': {
            'method': 'GET',
            'url': urlBase + 'history/historic-task-instances'
          },
          'getSingleHistoricTask': {
            'method': 'GET',
            'param': {taskId: '@taskId'},
            'url': urlBase + 'history/historic-task-instances/:taskId'
          },
          'queryHistoricTask': {
            'method': 'POST',
            'url': urlBase + 'query/historic-task-instances/'
          },
          'deleteHistoricTask': {
            'method': 'DELETE',
            'param': {taskId: '@taskId'},
            'url': urlBase + 'history/historic-task-instances/:taskId'
          }

        }
      );

      R["destroyById"] = R["deleteById"];
      R["removeById"] = R["deleteById"];

      return R;

    }])
    .factory('HistoryService', ['$resource', function ($resource) {

      var R = $resource(
        urlBase + "/history/:id",
        {'id': '@id'},
        {

          'query': {
            'method': 'POST',
            'url': urlBase + 'query/tasks'
          },

          'execute': {
            'method': 'post',
            'url': urlBase + 'runtime/tasks/:id'
          },
          'getVariablesForATask': {
            'method': 'GET',
            'url': urlBase + 'runtime/tasks/:id/variables'
          },
          'getVariablesFromTask': {
            'method': 'GET',
            'param': {variableName: '@variableName'},
            'url': urlBase + 'runtime/tasks/:id/variables/:variableName'
          },
          'getBinaryDataForVariable': {
            'method': 'GET',
            'param': {variableName: '@variableName'},
            'url': urlBase + 'runtime/tasks/:id/variables/:variableName/data'
          },
          'createVariableOnTask': {
            'method': 'POST',
            'url': urlBase + 'runtime/tasks/:id/variables'
          }

        }
      );

      R["destroyById"] = R["deleteById"];
      R["removeById"] = R["deleteById"];

      return R;

    }]);

  // TODO complete other methods


})(window, window.angular);
