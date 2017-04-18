using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace nvslonlineApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            //if ((Context.Request.Path.Contains("api/") || Context.Request.Path.Contains("odata/")) && Context.Request.HttpMethod == "OPTIONS")
            //{
            //    Context.Response.AddHeader("Access-Control-Allow-Origin", Context.Request.Headers["Origin"]);
            //    Context.Response.AddHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            //    Context.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            //    Context.Response.AddHeader("Access-Control-Allow-Credentials", "true");
            //}

            //if ((Context.Request.Path.Contains("api/") || Context.Request.Path.Contains("odata/")) && Context.Request.HttpMethod == "OPTIONS")
            //{
            //    Context.Response.AddHeader("Access-Control-Allow-Origin", Context.Request.Headers["Origin"]);
            //    Context.Response.AddHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            //    Context.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            //    Context.Response.AddHeader("Access-Control-Allow-Credentials", "true");
            //}

            if (Request.Headers.AllKeys.Contains("Origin") && Request.HttpMethod == "OPTIONS")
            {
                var origin = HttpContext.Current.Request.Headers["Origin"];

                Response.Headers.Add("Access-Control-Allow-Origin", origin);
                Response.Headers.Add("Access-Control-Allow-Headers", "content-type, withcredentials, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
                Response.Headers.Add("Access-Control-Allow-Credentials", "true");
                Response.Headers.Add("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");

                Response.Flush();
            }

        }
    }
}
